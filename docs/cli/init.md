## init

`tableland init`

Create a config file.

Before starting with the CLI, it’s best to create a config file. This will create a JSON or YAML file that stores a `privateKey`, `chain`, and `providerUrl`. Once these are set, commands will leverage these values.

Run the command, and then follow the prompts:

```bash
tableland init
```

This will trigger a series of steps. First, select your desired chain:

```markdown
? Select a preferred default chain (Use arrow keys)
❯ mainnet
homestead
optimism
arbitrum
matic
goerli
optimism-goerli
arbitrum-goerli
maticmum
localhost
local-tableland
```

You’ll want to set your private key. For example, a private key with value `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d` is an openly used account the comes with local node tooling like Hardhat, so it can also be used if you’re developing with `local-tablealand`. However, for any mainnets or testnets, it’s best to use your own private key.

```json
? Enter your private key (optional)
0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

Set your preferred format (JSON or YAML):

```markdown
? Select a config file output format
❯ json
yaml
```

Store your provider URL (Alchemy, Infura, etc.):

```markdown
? Enter a default JSON RPC API provider URL (optional)
https://eth-mainnet.alchemyapi.io/v2/123abc123a...
```

Then, enter the path where this value should be stored; the default value will be under `/Users/$USER/.tablelandrc.json`:

```markdown
? Enter path to store config file (use "." to print to stdout)
(/Users/$USER/.tablelandrc.json)
```

The resulting config file will resemble the following:

```json
{
  "privateKey": "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
  "chain": "mainnet",
  "providerUrl": "https://eth-mainnet.alchemyapi.io/v2/123abc123a..."
}
```
