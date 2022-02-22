---
description: >-
  Tableland supports many ways to mutate table rows, or lock a table's entire
  state.
---

# Immutable Tables

Tableland is designed for mutable data. Once a user or app creates a table, they are the default table `controller`. A controller owns and has control over all mutation operations on a table. This means only the `controller` can insert, delete, or update rows/data, while any other address is able to read or query a table.

However, because tables are ownable assets on the ETH network, a controller may wish to transfer ownership of the table to another address. This then gives this new address permission to mutate or otherwise control the table (including the ability to grant access to others).

But what if a table own wants to "lock" access to the table permanently? This can easily be done by removing access to the table for any and all addresses, including one's own address. This can be done in practice by "burning" the table token. To "burn" a token is to permanently and irreversibly remove that token from circulation, and in practice this can be done by transferring the token to a burn or null address, such as `0x0000000...` (the zero address).

Luckily for us, the ERC721 contract that Tableland uses for tables has a handy `burn` method, that can be called by its owner (`controller`) to burn the table's token (the table _data_ remains intact). This essentially makes the table un-ownable, rendering the table immutable because no one has permissions to mutate it anymore!

Et voilà, we now have an immutable, fixed state for our table. This is great for things like immutable NFT metadata, or for table versioning, or other scenarios where we need a permanent, immutable refrence to rows and columns of data.
