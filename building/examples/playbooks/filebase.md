---
description: >-
  Create relations between IPFS-based content and mutable metadata with
  Tableland + Filebase
---

# Filebase

[Filebase](https://filebase.com) is an S3-compatible object storage platform that allows you to store data in a secure, redundant, and performant manner across multiple decentralized storage networks. In practice, they provide an S3-compatible API layer on top of decentralized storage networks such as IPFS, Sia/Skynet, Storj. They also offer a super intuitive web console for storing and managing your data.

Filebase can be used to store data in “buckets” (think folders) with associated metadata. They are containers for data objects. You can upload files to IPFS by creating a new bucket on Filebase’s IPFS storage network. Like any content-addressable data on IPFS, objects stored on via Filebase on the IPFS network have an associated IPFS CID which is unique to each file, but isn’t easily identifiable like typical file IDs or storage paths. To solve this, you can create a table on Tableland that tracks your objects and their associated file name, type, and IPFS CID so you can query it whenever you need to quickly reference an object.

### Prerequisites

* Download and install the Tableland CLI tool: `npm i -g @textile/tableland-cli`
* [Sign up for a Filebase account](https://docs.filebase.com/getting-started-guides/getting-started-guide), and grab your Access and Secret Keys. Learn how to view your access keys [here](https://docs.filebase.com/getting-started-guides/getting-started-guide#working-with-access-keys).
* Have a Filebase bucket created on the IPFS network. For instructions on how to create a bucket on the IPFS network, see [here](https://docs.filebase.com/what-is-filebase/our-ecosystem/storage-networks/ipfs#how-do-i-store-data-on-ipfs-through-filebase).

### Tracking Assets

We’ll start by creating a new table called AssetTracker, that we’ll use to track our Filebase assets. The table definition is given below. You can use the tableland CLI tool to create the table. See our Command Line docs for details on getting started with the CLI tool.

```sql
CREATE TABLE AssetTracker (
	id INT PRIMARY KEY,
	name TEXT,
	type TEXT,
	cid TEXT,
	provider TEXT,
	url TEXT
);
```

This will create a table (say with the name `AssetTracker_0`) on the Tableland network. You’ll need to reference the table name later to update and query the table. It should look something like the following:

```json
{
	"name": "assettracker_192"
}
```

If you have your own API keys for Infura, Alchemy, etc you can avoid the warning message that was printed with the above command (assuming you’re using the CLI tool). See `tableland create --help` for details.

Then, insert some data to query using the query CLI command:

```sql
INSERT INTO assettracker_0 VALUES (
	0,
	'filebase_robot.png',
	'PNG',
	'bafybeict7kegxaugjue5rcys65islddi2rnzmj2hh2wfq3wynf7t772hy4',
	'filebase.com',
	'https://bafybeict7kegxaugjue5rcys65islddi2rnzmj2hh2wfq3wynf7t772hy4.ipfs.dweb.link'
);
```

Replace `assettracker_0` with the value you received in the previous step. The following table has some additional objects you might want to include.

| id | name                | type | cid                                                         | provider                                     | url                                                                                                                                                                      |
| -- | ------------------- | ---- | ----------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1  | filebase\_robot.png | PNG  | bafybeict7kegxaugjue5rcys65islddi2rnzmj2hh2wfq3wynf7t772hy4 | [https://filebase.com](https://filebase.com) | [https://bafybeict7kegxaugjue5rcys65islddi2rnzmj2hh2wfq3wynf7t772hy4.ipfs.dweb.link](https://bafybeict7kegxaugjue5rcys65islddi2rnzmj2hh2wfq3wynf7t772hy4.ipfs.dweb.link) |
| 2  | filebase\_logo.png  | PNG  | bafkreighyv7jppuyen6kvdw3lhnleydibj44wej3ejq2j7ndwd3hsa7oam | [http://filebase.com](http://filebase.com)   | [https://bafkreighyv7jppuyen6kvdw3lhnleydibj44wej3ejq2j7ndwd3hsa7oam.ipfs.dweb.link](https://bafkreighyv7jppuyen6kvdw3lhnleydibj44wej3ejq2j7ndwd3hsa7oam.ipfs.dweb.link) |

To query the database, use the following statement via the CLI’s `query` command:

```sql
SELECT * FROM assettracker_0;
```

This example queries all entries in the table. You can modify this to reflect your desired query for a single object or a certain criteria of objects.

For more information on Filebase, check out their documentation [here](https://docs.filebase.com). You can also explore the same playbook outline here from the Filebase side via the [Filebase - Tableland docs](https://docs.filebase.com/configurations/cli-tools-and-resources/tableland) section.
