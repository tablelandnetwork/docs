---
title: Python & web3.py
description: Create and write to the Tableland registry with Python and web3.py.
keywords:
  - python
  - web3.py
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The Tableland SDK is a JavaScript library, but you can makes calls directly to the Tableland registry contract using Python and the `web3.py` library. It requires a bit of effort to set up, and since reads are fully offchain, you also have to implement API calls to the [Tableland gateway](/validator/api/). There's also an _unofficial_, experimental [Python `tableland` SDK](https://github.com/dtbuchholz/tableland-py) that can be used as well.

## Using `web3.py`

### Installation & setup

Start by setting up a Python project. Then, depending on what you're using, you can install the `web3.py` library:

<Tabs groupId="py">
<TabItem value="pip" label="pip" default>

```bash
pip install web3
```

</TabItem>
<TabItem value="poetry" label="poetry">

```bash
poetry add web3
```

</TabItem>
<TabItem value="pipenv" label="pipenv">

```bash
pipenv install web3
```

</TabItem>
</Tabs>

In your source file, you'll need to import the `Web3` class from the `web3` library, and this `web3.py` package comes with an `Account` class from the `eth_account` library to handle private keys:

```python
from web3 import Web3
from eth_account import Account
```

:::tip
Cookiecutter is a popular tool to scaffold a new project, such as the [`sourcery-ai`](https://github.com/sourcery-ai/python-best-practices-cookiecutter) template.
:::

The next step is to set up an interface to the deployed Tableland registry contract. You can find a list of deployed Tableland contracts [here](/fundamentals/supported-chains). You'll also need to generate an ABI for the registry. Luckily, this is straightforward wth the `evm-tableland` package—clone the repo and run the following to build the contracts and artifacts:

```bash
git clone https://github.com/tablelandnetwork/evm-tableland
cd evm-tableland
npm install
npm run build
```

Then, you can generate the ABI:

```bash
cat artifacts/contracts/TablelandTables.sol/TablelandTables.json | jq '.abi' > abi.json
```

### Connecting to the Tableland registry

Now that we have the ABI, we can connect to the registry. There are two things we'll need:

- A private key to sign transactions.
- The provider of the chain's RPC provider.

The example below shows how you'd do this if you're connecting to [Local Tableland](/local-tableland/) with a Hardhat account:

```python
# Define provider and private key
provider_uri = "http://localhost:8545"
private_key = "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"

# Set up web3 instance and signer
w3 = Web3(Web3.HTTPProvider(provider_uri))
signer = Account.from_key(private_key)
```

Now that we have the provider and signer, we can load the ABI and connect to the Tableland registry. If we're using Local Tableland, the registry address is `0xe7f1725e7734ce288f8367e1bb143e90bb3f0512`:

```python
from web3 import Web3
from eth_account import Account
# highlight-next-line
from eth_utils import to_checksum_address

# Existing code...

abi_file = "abi.json" # Path to the ABI file
abi = read_file_to_json(abi_file)
registry_addr = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
registry = w3.eth.contract(
    address=to_checksum_address(registry_addr), abi=abi
)
```

### Creating tables

Great, now the contract is ready to be called. We can run methods like the `create` and `mutate` functions. Here's an example of creating a table:

```python
tx_hash_create = registry.functions.create(
    signer.address, "CREATE TABLE my_table_31337 (id integer, val text)"
).transact()
```

You'll notice that if you're sending a raw `CREATE` statement directly to the registry, you must append the chain ID to the custom table prefix. Here, `my_table` is appended with `_31337` since it's being deployed on a local Hardhat node with a Local Tableland setup.

Then, you can wait for the transaction to be mined and parse the event log for the `CreateTable` event:

```python
create_rec = w3.eth.wait_for_transaction_receipt(tx_hash_create)
create_log = registry.events.CreateTable().process_receipt(create_rec)
```

Optionally, you can parse the log to extract the data:

```python
data = create_log[0]
owner = data["args"]["owner"]
table_id = data["args"]["tableId"]
statement = data["args"]["statement"]
event = data["event"]
transaction_hash = data["transactionHash"].hex()
block_number = data["blockNumber"]
```

### Writing to tables

The flow is similar for writing to a table. The only difference is you must pass a value in the `transact` method:

```python
tx_hash_mutate = self.registry.functions.mutate(
    signer.address, table_id, "INSERT INTO my_table_31337_2 VALUES (1, 'hello')"
).transact({"from": signer.address})
```

The event will be slightly different but can be parsed as well for the `RunSQL` event:

```python
mutate_rec = w3.eth.wait_for_transaction_receipt(tx_hash_mutate)
mutate_log = registry.events.RunSQL().process_receipt(mutate_rec)
```

Lastly, parse the log to extract the data:

```python
data = mutate_log[0]
caller = data["args"]["caller"]
is_owner = data["args"]["isOwner"]
table_id = data["args"]["tableId"]
statement = data["args"]["statement"]
policy = data["args"]["policy"]
event = data["event"]
transaction_hash = data["transactionHash"].hex()
block_number = data["blockNumber"]
```

## Experimental `tableland` SDK

There's an experimental Python SDK that can be used to interact with the Tableland registry. It's not officially supported, but it's a good starting point for Python developers. One of the challenges with the approach above is that you also need to interact with the [validator APIs](/validator/api/) to make sure onchain SQL is successfully materialized.

### Installation & setup

The [`tableland`](https://github.com/dtbuchholz/tableland-py) Python library handles this and makes it easier to get started. You can install by running the following command:

<Tabs groupId="py">
<TabItem value="pip" label="pip" default>

```bash
pip install tableland
```

</TabItem>
<TabItem value="poetry" label="poetry">

```bash
poetry add tableland
```

</TabItem>
<TabItem value="pipenv" label="pipenv">

```bash
pipenv install tableland
```

</TabItem>
</Tabs>

### Creating tables

You can import the library and set up the connection in a way that's similar to the official Tableland JavaScript SDK:

```python
from tableland import Database

private_key = "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"  # Replace with your private key
db = Database(
    private_key=private_key,
    provider_uri="http://localhost:8545",  # Replace with your chain RPC provider URL
)
```

Creating a table includes the registry contract call as shown in the walkthrough above, but it also handles waiting for the validator to materialize the SQL and includes error messages in case of syntax issues:

```python
# Create a new table
statement = "create table my_table (id int, val text)"
create_event = db.create(statement)
table_name = create_event["table_name"]
table_id = create_event["table_id"]

# Check if there are any errors
if create_event["error"] is not None:
    print(f"Error: {create_event['error']}")
```

By default, both the `create` and `write` method will wait for the transaction to be included onchain _and_ wait for the validator to materialize the SQL. This is a key difference from the `web3.py` approach, where you have to handle this yourself. However, if desired, you can turn this off by passing an additional `wait` parameter set to `False`.

### Writing to tables

Once a table is created, writing to it is straightforward and follows a similar pattern.

```python
# Insert a row into the table
statement = f"insert into {table_name} (id, val) values (1, 'hello')"
write_event = db.write(statement)

# Check if there are any errors
if write_event["error"] is not None:
    print(f"Error: {write_event['error']}")
```

A few helpers are included to do things, such as directly fetching a transaction's receipt from the database to check if it was successful:

```python
receipt = db.get_receipt(tx_hash)
if receipt["error"] is not None:
    print(f"Error: {write_event['error']}")
```

### Reading data

Lastly, the `read` method lets you write arbitrary SQL statements to query the table:

```python
# Query the table
statement = f"select * from {table_name}"
data = db.read(statement)
print(data)
# [{'id': 1, 'val': 'hello'}]
```

A couple of other read-only database methods are provided with `get_owner` and `get_table_info`, which query the table's owner and table info like its schema:

```python
# Get table info
owner = db.get_owner(table_id)
print(owner)
# 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

# Get table info
schema = db.get_table_info(table_id)["schema"]["columns"]
print(schema)
# [{"name": "id", "type": "int"}, {"name": "val", "type": "text}]
```

Lastly, the `tableland` library also includes a few other helpers like `get_registry_address`, `get_validator_base_uri`, and `get_validator_polling_config` for fetching database configuration inforamtion. If you're interested in contributing to the library, you can find the source code on [GitHub](https://github.com/dtbuchholz/tableland-py).
