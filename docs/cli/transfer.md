
## transfer

Transfer a table to another address

```markdown
Positionals:
name The target table name [string] [required]
receiver The address to transfer the table to [string] [required]

Options:

-k, --privateKey Private key string [string]
-c, --chain The EVM chain to target [string]
```

### Example

Transfer a table from current wallet to another address

```bash
tableland transfer example_table_313337_1 0x0000000000000000000000
```

Response:

```JSON
{
  "type": 2,
  "chainId": 31337,
  "nonce": 1,
  "maxPriorityFeePerGas": {
    "type": "BigNumber",
    "hex": "0x59682f00"
  },
  "maxFeePerGas": {
    "type": "BigNumber",
    "hex": "0x7661cc5a"
  },
  "gasPrice": null,
  "gasLimit": {
    "type": "BigNumber",
    "hex": "0x0115da"
  },
  "to": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  "value": {
    "type": "BigNumber",
    "hex": "0x00"
  },
  "data": "0x42842e0e00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000003c44cdddb6a900fa2b585dd299e03d12fa4293bc0000000000000000000000000000000000000000000000000000000000000002",
  "accessList": [],
  "hash": "0x300816cf3b569f446240966e48588c55f735db91beb86e601fec09c1cce52caa",
  "v": 0,
  "r": "0xe2e861751e1fde983daca55659856c90894c3275fa6505bb393af6a40186c8cb",
  "s": "0x66553031615ac79e05cf46c826f130c5e122b04edcd441cc7acfa661ee7fb4c1",
  "from": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "confirmations": 0
}

```
