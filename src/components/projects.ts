// Note: Docusaurus expects all files in `/pages` to export a React component,
// so this file must be moved elsewhere to avoid compilation errors.
import { type Project } from "../pages/showcase";

export default [
  {
    name: "DIMO",
    description:
      "Open & user-owned IoT network with vehicle definitions stored publicly in tables.",
    logo: "dimo.png",
    protocol: "Tableland",
    tags: ["DePIN", "Dataset", "Infra"],
    chains: ["Polygon"],
    website: "https://dimo.zone",
    github: "https://github.com/tablelandnetwork/dimo-vehicle-defs",
    twitter: "https://twitter.com/DIMO_Network",
    details: `DIMO is an open and user-owned network. DIMO is an open and user-owned network where drivers can plug DIMO hardware into their cars and earn rewards for the data they share.\n\nPart of DIMO's solution is a vehicle definitions registry that stores vehicle data in a standardized format. With Tableland, this table is publicly queryable and can be used by anyone to build applications on top of the data.\n\nFrom a design perspective, the table is owned by and written to by a VehicleId NFT contract, and VehicleId tokens represent user vehicles and are associated with a vehicle definition (e.g., 2011 Toyota Tacoma). The crux of the problem is how to ensure that a given vehicle definition exists when a new VehicleId is minted from the contract.`,
  },
  {
    name: "WeatherXM",
    description:
      "Community powered weather network with device Data Availability provided by Textile.",
    logo: "wxm.png",
    protocol: "Textile",
    tags: ["DePIN", "Dataset", "Infra"],
    chains: ["Polygon"],
    website: "https://weatherxm.com/",
    github: "https://github.com/WeatherXM",
    twitter: "https://twitter.com/WeatherXM",
    details: `WeatherXM is a network that's powered by community owned devices, purpose built by WeatherXM for weather data collection. As part of the network, devices are incentivized to share data, which is sent to various stations throughout the globe.\n\nOne of the challenges with this approach is not only ensuring that the raw device data is available when it's needed, but as a decentralized network, its infrastructure must also make sure that data is stored in a decentralized fashion instead of centralized infrastructure.\n\nAs devices send data to the network, it's replicated to a hot for immediate and TTL retrieval, which is pertinent for compute over that data. And for persistence guarantees, this data is also replicated to Filecoin for long-term storage guarantees, which can help the network ensure that data is available for years to come.`,
  },
  {
    name: "KittyKart",
    description:
      "An FPS racing game where players can battle & upgrade their Karts as dynamic NFTs.",
    logo: "kittykart.png",
    protocol: "Tableland",
    tags: ["Gaming", "NFT"],
    chains: ["Arbitrum"],
    website: "https://www.kittykart.io",
    twitter: "https://twitter.com/KittyKartRacing",
    details: `KittyKart is a web3-native game that lets racers compete against each other. Every Kart is an ERC721 token, and each Kart can earn rewards as Asset NFTs—inventory that can be applied to the Kart NFT.\n\nThis approach required truly dynamic onchain actions because as rewards were earned, the NFT metadata needed a way to automatically update based with new Assets. Within an "Autobody Shop," users get to choose which of the Assets they equip to their cart.\n\nAll of this was made possible with Tableland's onchain table creates, writes, and access controls, ensure smart contracts dictate exactly how NFT metadata was updated and rendered at the application layer.`,
  },
  {
    name: "DR/VRS",
    description: "Web3 brand & NFT, exploring dynamism for the collection.",
    logo: "drvrs.png",
    protocol: "Tableland",
    tags: ["NFT"],
    chains: ["Ethereum"],
    website: "https://weownthenight.io/home",
    twitter: "https://twitter.com/drivrsnft",
    details: `DR/VRS is an NFT collection consisting of 8,888 drivers. As part of the broader picture, it's a brand that plans to build out ideas like a graphic novel, merch shop, and animated series.\n\nPart of the team's exploration into Tableland was to enhance their collection with additional features for the community, which requires dynamic, onchain actions to control NFT metadata. The architecture originally stored NFT metadata in Firebase, but the goal of the proof-of-concept was to further open up access to this dataset and deploy it entirely in a web3-native setting.`,
  },
  {
    name: "Rigs",
    description:
      "Dynamic NFT collection with pilots & Flight Time rewards through onchain actions.",
    logo: "rigs.png",
    protocol: "Tableland",
    tags: ["NFT", "dApp"],
    chains: ["Ethereum", "Filecoin", "Arbitrum"],
    website: "https://tableland.xyz/rigs",
    github: "https://github.com/tablelandnetwork/rigs",
    twitter: "https://twitter.com/tableland",
    details: `Tableland Rigs is a 3k generative NFT built from 1,074 handcrafted works of art for the builders and creatives of cyberspace. It is a collection created by the core Tableland team.\n\nRigs are dynamic NFTs with tables deployed across multiple chains (Ethereum, Filecoin, and Arbitrum) where "piloting" a Rig accrues "Flight Time," and The Garage app lets you interact with your Rig. The Garage includes the collection's metrics dashboard, Rig profiles, collector profiles, and a dedicated gallery with Rig-specific trait filters, and the app itself relies on publicly queryable Tableland tables, which are controlled by the Rigs smart contract. The tables contain data that can be queried as ERC721 metadata and data for pilot sessions.\n\nLastly, The Garage also includes a "Mission Board" and voting system where the Flight Time is earned through onchain actions and then usable with community proposal voting. Check out the links above for more details on the collection and implementation behind the art!`,
  },
  {
    name: "Studio",
    description:
      "Web application that manages Tableland projects, teams, and deployments.",
    logo: "studio.png",
    protocol: "Tableland",
    tags: ["dApp"],
    chains: ["Arbitrum"],
    website: "https://studio.tableland.xyz",
    github: "https://github.com/tablelandnetwork/studio",
    twitter: "https://twitter.com/tableland",
    details: `The Tableland Studio is a web application designed to make it easier to create and manage your tables. Developers can create projects, deploy tables, and interact with them from the browser, or you can choose to use the CLI tool to perform similar actions from the comfort of your command line.\n\nIn total, 11 Tableland tables are deployed on Arbitrum Nova, selected due to its fast and cheap storage capabilities. These include: users, projects, teams, tables, and a number of others that store pertinent application information. The app itself is built with a number of familiar technologies, including Next.js, Tailwind, wagmi, and Drizzle.`,
    youtubeId: "-MUq--Nrd0c",
  },
] as Project[];
