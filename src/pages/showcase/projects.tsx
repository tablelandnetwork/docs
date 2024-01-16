export interface Project {
  name: string; // Name of the project
  description: string; // Short description
  logo: string; // Logo filename in `src/static/img/showcase`
  tags?: Tags[]; // Tags for the project, for filtering
  chains?: Chains[]; // Chains the project is on, for filtering
  website: string; // Website link
  github: string; // Github link
  twitter: string; // Twitter link
  details: string; // Long form details about the project
  youtubeId?: string; // Youtube demo ID, e.g., `-MUq--Nrd0c` for `https://www.youtube.com/watch?v=-MUq--Nrd0c`
}

export type Tags =
  | "NFT"
  | "Gaming"
  | "DAO"
  | "DeFi"
  | "Infra"
  | "Social"
  | "Data"
  | "AI"
  | "ML";

export type Chains =
  | "Ethereum"
  | "Filecoin"
  | "Arbitrum"
  | "Optimism"
  | "Polygon";

export const projects = [
  {
    name: "Tableland Rigs",
    description: "Dynamic NFT collection with pilots & Flight Time rewards.",
    logo: "rigs.png",
    tags: ["NFT"],
    chains: ["Ethereum", "Filecoin", "Arbitrum"],
    website: "https://tableland.xyz/rigs",
    github: "https://github.com/tablelandnetwork/rigs",
    twitter: "https://twitter.com/tableland",
    details: `Tableland Rigs is a 3k generative NFT built from 1,074 handcrafted works of art for the builders and creatives of cyberspace. It is a collection created by the core Tableland team.\n\nRigs are dynamic NFTs with tables deployed across multiple chains (Ethereum, Filecoin, and Arbitrum) where "piloting" a Rig accrues "Flight Time," and The Garage app lets you interact with your Rig. The Garage includes the collection's metrics dashboard, Rig profiles, collector profiles, and a dedicated gallery with Rig-specific trait filters, and the app itself relies on publicly queryable Tableland tables, which are controlled by the Rigs smart contract. The tables contain data that can be queried as ERC721 metadata and data for pilot sessions.\n\nLastly, The Garage also includes a "Mission Board" and voting system where the Flight Time is earned through onchain actions and then usable with community proposal voting. Check out the links above for more details on the collection and implementation behind the art!`,
  },
] as Project[];
