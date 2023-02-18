---
title: Tableland Rigs
description: A developer-first NFT, inherently rewarding builders and community members of the Tableland network.
synopsis: Rigs are a generative collection of 3k NFTs designed for those who build on Tableland. They set a foundation to help reward developers for building high value applications and to those contributing to the ecosystem as a whole.
keywords:
  - rigs
  - the garage
---

## Overview

There are a number of ways the Tableland protocol plans to leverage [Rigs](https://opensea.io/collection/tableland-rigs), and additional experiences can easily leverage the NFT itself. One of the main value propositions the Tableland _protocol_ brings is open and composable data, especially, for NFTs. This framework leads to interoperable and composable applications built using the Tableland protocol, and all Rigs NFT metadata is open for consumption by an NFT collection or application builder.

:::tip
Check out our [homepage](https://tableland.xyz/rigs/) for a deeper dive, plus, a showcase of the Rigs collection artwork.

:::

## Rigs NFT deployment

Rigs use Tableland for metadata, are multichain, and they demonstrate exactly how NFTs _should be_ built. The following highlights some information about the actual deployment:

- Rigs are minted on Ethereum (mainnet) at the contract:
  - [`0x8EAa9AE1Ac89B1c8C8a8104D08C045f78Aadb42D`](https://etherscan.io/address/0x8eaa9ae1ac89b1c8c8a8104d08c045f78aadb42d)
- Rigs metadata _lives_ in Tableland—see [here for an example](<https://tableland.network/query?extract=true&unwrap=true&s=select%20json_object('name'%2C'Rig%20%23'%7C%7Crig_id%2C'external_url'%2C'https%3A%2F%2Fgarage.tableland.xyz%2Frigs%2F'%7C%7Crig_id%2C'image'%2C'ipfs%3A%2F%2F'%7C%7Crenders_cid%7C%7C'%2F'%7C%7Crig_id%7C%7C'%2F'%7C%7Cimage_full_name%2C'image_alpha'%2C'ipfs%3A%2F%2F'%7C%7Crenders_cid%7C%7C'%2F'%7C%7Crig_id%7C%7C'%2F'%7C%7Cimage_full_alpha_name%2C'image_medium'%2C'ipfs%3A%2F%2F'%7C%7Crenders_cid%7C%7C'%2F'%7C%7Crig_id%7C%7C'%2F'%7C%7Cimage_medium_name%2C'image_medium_alpha'%2C'ipfs%3A%2F%2F'%7C%7Crenders_cid%7C%7C'%2F'%7C%7Crig_id%7C%7C'%2F'%7C%7Cimage_medium_alpha_name%2C'thumb'%2C'ipfs%3A%2F%2F'%7C%7Crenders_cid%7C%7C'%2F'%7C%7Crig_id%7C%7C'%2F'%7C%7Cimage_thumb_name%2C'thumb_alpha'%2C'ipfs%3A%2F%2F'%7C%7Crenders_cid%7C%7C'%2F'%7C%7Crig_id%7C%7C'%2F'%7C%7Cimage_thumb_alpha_name%2C'animation_url'%2Canimation_base_url%7C%7Crig_id%7C%7C'.html'%2C'attributes'%2Cjson_insert((select%20json_group_array(json_object('display_type'%2Cdisplay_type%2C'trait_type'%2Ctrait_type%2C'value'%2Cvalue))from%20rig_attributes_42161_15%20where%20rig_id%3D1%20group%20by%20rig_id)%2C'%24%5B%23%5D'%2Cjson_object('display_type'%2C'string'%2C'trait_type'%2C'Garage%20Status'%2C'value'%2Ccoalesce((select%20coalesce(end_time%2C%20'in-flight')%20from%20pilot_sessions_1_7%20where%20rig_id%3D1%20and%20end_time%20is%20null)%2C'parked'))))%20from%20rig_attributes_42161_15%20join%20lookups_42161_10%20where%20rig_id%3D1%20group%20by%20rig_id%3B>)—and includes cross chain queries for metadata composition.
- The [allowlist was publicly readable](https://testnets.tableland.network/query?s=select%20*%20from%20rigs_allowlist_5_59) since it was deployed in Tableland. It was also used in the minting UI to show if any allow list spots were reserved upon wallet connection; a real but simple use case, demonstrating the art of the possible for the web3 user experience. Lastly, the contract leveraged _merkle proofs_ to ensure off-chain mint calls were coming from users on the allow list, defined in the [on-chain contract’s `allowListRoot`](https://etherscan.io/readContract?m=normal&a=0x8eaa9ae1ac89b1c8c8a8104d08c045f78aadb42d&v=0x098a358e14eddedecbf074cb4796074e7de8675e#F1).
  - For more background, this works by allowing anyone to submit a valid merkle proof to `mint`, where the leaf is rebuilt in the contract using `msg.sender`—and the proof is used to verify _that_ leaf in the contract. That is, since you can't spoof `msg.sender`, it doesn't matter that you _could_ generate proofs for other people.
- The Rigs smart contract is an _upgradeable_ smart contract—this follows best practices that are used in smart contract development and allows for future Rigs upgrades to the developer experience.
