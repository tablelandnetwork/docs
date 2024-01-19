---
title: Gaming
description: Build open gaming state, leaderboards, and inventory.
keywords:
  - gaming
  - leaderboards
  - inventory
---

Web3 games can take advantage of open data access with controlled writes to build a developer-focused ecosystem. These guide will help you set up a gaming state, leaderboard, and inventory your game. The examples will take more of a generic application approach with offchain processing, but it'd be trivial to move the game state onchain and automate some of the actions with smart contracts.

## Table design

### Game state

Every game is going to have widely varying state requirements. We'll make our game state pretty simple: tic-tac-toe. We'll store the game state in a single `game_state` table, with a single row. The `id` will be an auto-incrementing integer, the `user_address_<x|o>` store the user's address for playing an `x` or `o`, and the winner of the game will be stored upon game conclusion. Each move will be stored as a JSON object in the `moves` field as the game progress.

```sql
CREATE TABLE game_state (
  id INTEGER PRIMARY KEY,
  user_address_x TEXT NOT NULL,
  user_address_o TEXT NOT NULL,
  moves TEXT NOT NULL,
  winner TEXT
);
```

An alternative approach could store the game state in a separate table where each column represents a coordinate of a 3x3 grid and reference the game state ID in the `game_state` table. This would allow for more dynamic queries and could make use of [SQL JSON functions](/sql/functions#json-functions) for retrieval purposes. We could also create a users table to store each user's address, and reference the user ID in the `game_state` table. But, we'll keep this example simple,

### Leaderboard

Games are first created in the `game_state` table, and upon conclusion, a winner will be populated. You can definitely query the `game_state` table, aggregate the number of wins per user, and display this leaders dynamically. However, if you want a leaderboard that stores point-in-time aggregates, or the game state lives offchain, a `leaderboard` table can be created to store that state.

```sql
CREATE TABLE leaderboard (
  block_num INTEGER,
  user_address TEXT NOT NULL,
  wins INTEGER NOT NULL
);
```

The schema also includes a `block_num` column, which will store the block number for when the leaderboard snapshot was taken. This can make use of the [BLOCK_NUM()](/sql/functions#block-number) function.

### Inventory

Commonly, gaming inventory will actually exist as an NFT, whether that's an ERC721 or ERC1155 token—see the playbooks [here](/playbooks/blueprints/erc721-metadata) and [here](/playbooks/blueprints/erc721-metadata) for examples, respectively. NFTs allow you to dynamically equip or unequip items directly within the NFT's metadata, but perhaps your game requires a more complex inventory system that considers inventory rendered at the application layer and not the NFT metadata layer. In this case, you can create an `inventory` table that stores the user's address, the inventory item's ID, and the state of that item.

```sql
CREATE TABLE inventory (
  user_address TEXT PRIMARY KEY,
  item_id INTEGER NOT NULL,
  is_equipped INTEGER NOT NULL DEFAULT 0
);
```

We'll make sure that when a user receives some equippable inventory, the default state is to leave the item unequipped.

## Queries

The following outlines example mutating queries and, where applicable, the corresponding read queries. For these example, let's say we have two users: `0x123...` and `0x456...`.

### Game state

#### Create a new game

Since we're not specifying the `id` column in the query below, it will auto-increment (an `INTEGER PRIMARY KEY` field will auto-increment by default). Our game is storing state as a JSON object. We'll want to make sure the game state is a 3x3 grid, the user is playing as either an `x` or `o`, and each step is recorded. Thus, our raw JSON will look like the following:

```json
{
  "state": [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  "moves": []
}
```

Formatted for SQL, we'll have the following, and note that we're using single quotes to wrap the JSON string, and double quotes for the values:

```sql
INSERT INTO
  game_state (user_address_x, user_address_o, moves)
VALUES
  (
    '0x123...',
    '0x456...',
    '{"state":[["","",""],["","",""],["","",""]],"moves":[]}'
  );
```

#### Update game state

After each player moves, we'll update the game state. We want to make sure the user is playing as either an `x` or `o`, and that the move is valid. At the application layer, we can handle parsing the JSON and moves accordingly and will ignore that logic. Our raw JSON might look like the following::

```json
{
  "state": [
    ["", "", ""],
    ["", "x", ""],
    ["", "", ""]
  ],
  "moves": [
    {
      "1-22": "x"
    }
  ]
}
```

The `moves` stores the move number combined with the grid number (i.e., `1-22` is the first move in the second row and second column). You could imagine other ways to store the move history; this example just stores what each move was, mapped to the step number. Thus, the SQL query will look like:

```sql
UPDATE
  game_state
SET
  moves = '{"state":[["","",""],["","x",""],["","",""]],"moves":[{"1-22":"x"}]}'
WHERE
  id = 1;
```

#### Conclude game

Upon game conclusion, we'll want to update the `winner` field. We'll want to make sure the user is playing as either an `x` or `o`, and that the move is valid. Thus, our raw JSON will look like the following:

```json
{
  "state": [
    ["", "", "x"],
    ["", "x", ""],
    ["x", "o", "o"]
  ],
  "moves": [
    {
      "1-22": "x",
      "2-33": "o",
      "3-31": "x",
      "4-32": "o",
      "5-13": "x"
    }
  ]
}
```

Let's assume our application logic has determined that the `x` player won. The `winner` field will be set to the `x` player's address, along with the JSON shown above:

```sql
UPDATE
  game_state
SET
  moves = '{...}',
  winner = '0x123...'
WHERE
  id = 1;
```

Now, we can query the `game_state` table at some interval and write game state aggregates to the `leaderboard` table.

### Leaderboard

After a number of games are played, our `game_state` table might look like the following. Note the final entry is a game that's in progress, so the `winner` field is `NULL`.

| id  | user_address_x | user_address_o | moves   | winner   |
| --- | -------------- | -------------- | ------- | -------- |
| 1   | 0x123...       | 0x456...       | `{...}` | 0x123... |
| 2   | 0x123...       | 0x456...       | `{...}` | 0x456... |
| 3   | 0x123...       | 0x456...       | `{...}` | 0x123... |
| 4   | 0x123...       | 0x456...       | `{...}` | NULL     |

#### Create a new leaderboard entry

You _could_ simply query the `game_state` table and aggregate the number of wins per user—then displaying the leaders dynamically, in case you just want all wins ever recorded.

```sql
SELECT
  winner, COUNT(*) as wins
FROM
  game_state
WHERE
  winner IS NOT NULL
GROUP BY
  winner;
```

However, if you want a `leaderboard` table to snapshot state, you'll want to create a new entry for each snapshot. We'll make use of the `BLOCK_NUM()` function to store the block number for when the snapshot was taken and execute a subquery that aggregates the number of wins per user.

```sql
INSERT INTO
  leaderboard (block_num, user_address, wins)
SELECT
  BLOCK_NUM(),
  winner,
  COUNT(*) as win_count
FROM
  game_state
WHERE
  winner IS NOT NULL
GROUP BY
  winner;
```

The resulting `leaderboard` table will look like the following:

| block_num | user_address | wins |
| --------- | ------------ | ---- |
| 98765     | 0x123...     | 2    |
| 98765     | 0x456...     | 1    |

### Inventory

Lastly, our inventory table will simply store which items a user has and whether or not they're equipped. Let's say we have two unique items (what these items represent doesn't quite matter). The item's details correspond to some other table outside of this example, such as an ERC721 or ERC1155 token's metadata tables.

When an item is rewarded to the user, the item ID, user's address, and equipped state are written to the table. Our example shows the user is initially been rewarded with items `1` and `2`, with the initial state of `is_equipped` defaulting to `0` (false).

#### Create inventory entries

```sql
INSERT INTO
  inventory (user_address, item_id)
VALUES
  ('0x123...', 1),
  ('0x123...', 2);
```

#### Update inventory

The user then takes some action and equips item `1`, setting the `is_equipped` field to `1` (true).

```sql
UPDATE
  inventory
SET
  is_equipped = 1
WHERE
  user_address = '0x123...'
  AND item_id = 1;
```

Our final inventory is now:

| user_address | item_id | is_equipped |
| ------------ | ------- | ----------- |
| 0x123...     | 1       | 1           |
| 0x123...     | 2       | 0           |

## Next steps

These example walked through purely SQL queries, but you can imagine how these queries could be automated with smart contracts through a combination of onchain and offchain state. Hopefully, these examples give you a good starting point for building your own gaming state, leaderboard, and inventory!
