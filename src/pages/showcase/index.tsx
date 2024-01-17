import React, { useState, useEffect } from "react";
import { FaX, FaPlus, FaXTwitter, FaGithub, FaLink } from "react-icons/fa6";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import Modal from "react-modal";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import CustomFooter from "@site/src/theme/CustomFooter";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import ThemedImage from "@theme/ThemedImage";
import YoutubeEmbed from "@site/src/components/YoutubeEmbed";
import projectsData from "../../components/projects";
import styles from "./index.module.css";

export interface Project {
  name: string; // Name of the project
  description: string; // Short description
  logo: string; // Logo filename in `src/static/img/showcase`
  protocol: Protocol; // Either Tableland or Textile
  tags?: Tags[]; // Tags for the project, for filtering
  chains?: Chains[]; // Chains the project is on, for filtering
  website: string; // Website link
  github?: string; // Github link
  twitter: string; // Twitter link
  details: string; // Long form details about the project
  youtubeId?: string; // Youtube demo ID, e.g., `-MUq--Nrd0c` for `https://www.youtube.com/watch?v=-MUq--Nrd0c`
}

export type Protocol = "Tableland" | "Textile";

export type Tags =
  | "NFT"
  | "Gaming"
  | "DAO"
  | "DeFi"
  | "Infra"
  | "Social"
  | "Dataset"
  | "DePIN"
  | "dApp"
  | "AI"
  | "ML";

export type Chains =
  | "Ethereum"
  | "Filecoin"
  | "Arbitrum"
  | "Optimism"
  | "Polygon";

interface FilterOptions {
  tags: Tags[];
  chains: Chains[];
  protocol: Protocol[];
}

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

Modal.setAppElement("#__docusaurus");

export default function Showcase() {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    tags: [],
    chains: [],
    protocol: [],
  });
  const [filter, setFilter] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  useEffect(() => {
    setProjects(projectsData);
    setLoading(false);
    const allTags = new Set();
    const allChains = new Set();
    const allProtocols: Protocol[] = ["Tableland", "Textile"];

    projectsData.forEach((project) => {
      project.tags?.forEach((tag) => allTags.add(tag));
      project.chains?.forEach((chain) => allChains.add(chain));
    });

    const uniqueTags = Array.from(allTags) as Tags[];
    const uniqueChains = Array.from(allChains) as Chains[];
    setFilterOptions({
      tags: uniqueTags,
      chains: uniqueChains,
      protocol: allProtocols,
    });
  }, []);

  useEffect(() => {
    const openModalFromQueryParams = () => {
      if (!loading) {
        const queryParams = new URLSearchParams(location.search);
        const projectSlug = queryParams.get("project");

        if (projectSlug) {
          const project = projects.find((p) => slugify(p.name) === projectSlug);
          if (project) {
            setCurrentProject(project);
            setModalIsOpen(true);
          }
        } else {
          setModalIsOpen(false);
        }
      }
    };

    openModalFromQueryParams();
  }, [location, loading, projects]);

  const openModal = (project: any) => {
    setCurrentProject(project);
    setModalIsOpen(true);
    const slug = slugify(project.name);
    history.push(`${location.pathname}?project=${slug}`);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentProject(null);
    history.replace(location.pathname);
  };

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: any) => {
    const value = e.target.value;
    setFilter(value);
  };

  const filteredProjects = projects
    .filter((project) => {
      // Filter based on search query
      return (
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        project.chains?.some((chain) =>
          chain.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        project.protocol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter((project) => {
      // Filter based on the selected filter (if any) for tags, chains, or
      // protocol (Tableland or Textile)
      return (
        filter === "" ||
        project.tags?.includes(filter as Tags) ||
        project.chains?.includes(filter as Chains) ||
        project.protocol === filter
      );
    });

  return (
    <Layout title="Showcase" description="Tableland ecosystem projects">
      <div className="container" id="showcase">
        <header
          className={clsx("margin-top--md padding-top--md", styles.headerRow)}
        >
          <Heading as="h1" title="Showcase">
            Showcase
          </Heading>
          <Link
            className={clsx("button button--primary", styles.addProjectBtn)}
            to="https://github.com/tablelandnetwork/docs/issues/new"
          >
            <FaPlus />
            <span>Add your project</span>
          </Link>
        </header>
        <p className="hero__subtitle">
          Explore the ecosystem of projects building with the protocol.
        </p>
        <input
          type="text"
          placeholder="Search by name, tags, or chain..."
          onChange={handleSearch}
          value={searchQuery}
          className={styles.searchInput}
        />
        <select onChange={handleFilterChange} className={styles.dropdownFilter}>
          <option value="">Filter by</option>
          <optgroup label="Protocol">
            {filterOptions.protocol.map((protocol) => (
              <option key={protocol} value={protocol}>
                {protocol}
              </option>
            ))}
          </optgroup>
          <optgroup label="Chains">
            {filterOptions.chains.map((chain) => (
              <option key={chain} value={chain}>
                {chain}
              </option>
            ))}
          </optgroup>
          <optgroup label="Tags">
            {filterOptions.tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </optgroup>
        </select>
        <hr />
        {!loading && (
          <>
            <div className={styles.projectShowcase}>
              {filteredProjects.map((project) => (
                <div
                  key={slugify(project.name)}
                  className={styles.projectCard}
                  onClick={() => openModal(project)}
                >
                  <div className={styles.projectCardImage}>
                    <img
                      src={`/img/showcase/${project.logo}`}
                      alt={project.name}
                      className="showcase-img"
                    />
                  </div>
                  <div className={styles.projectCardContent}>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className={styles.projectCardTags}>
                      {[...(project.chains || []), ...(project.tags || [])].map(
                        (tag, index) => (
                          <span key={`${tag}-${index}`}>{tag}</span>
                        )
                      )}
                    </div>
                  </div>
                  <div className={styles.projectCardProtocol}>
                    {project.protocol === "Tableland" ? (
                      <>
                        <ThemedImage
                          alt="Built on Tableland"
                          sources={{
                            light: `/img/tableland/mesa-black.png`,
                            dark: `/img/tableland/mesa-white.png`,
                          }}
                        />
                        <span className={styles.tooltipText}>
                          Built on Tableland
                        </span>
                      </>
                    ) : (
                      <>
                        <ThemedImage
                          alt="Built on Textile"
                          sources={{
                            light: `/img/tableland/textile.png`,
                            dark: `/img/tableland/textile.png`,
                          }}
                        />
                        <span className={styles.tooltipText}>
                          Built on Textile
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Project details"
                className={styles.modalContent}
                overlayClassName={styles.modalOverlay}
              >
                {currentProject && (
                  <div>
                    <div className={styles.modalTitleRow}>
                      <h2>{currentProject.name}</h2>
                      <ul className={styles.modalLinks}>
                        <li>
                          <Link to={currentProject.website}>
                            <FaLink />
                          </Link>
                        </li>
                        <li>
                          <Link to={currentProject.github}>
                            <FaGithub />
                          </Link>
                        </li>
                        <li>
                          <Link to={currentProject.twitter}>
                            <FaXTwitter />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <p className="margin-bottom--md">
                      {currentProject.description}
                      <br />
                    </p>
                    <div
                      className={clsx(
                        "margin-bottom--md",
                        styles.projectCardTags
                      )}
                    >
                      {[
                        ...(currentProject.chains || []),
                        ...(currentProject.tags || []),
                      ].map((tag, index) => (
                        <span key={`${tag}-${index}`}>{tag}</span>
                      ))}
                      <span className={styles.builtOnTag}>
                        Built on {currentProject.protocol}
                      </span>
                    </div>{" "}
                    <hr />
                    <h3>Details</h3>
                    <p className={clsx(styles.modalDetails)}>
                      {currentProject.details}
                    </p>
                    {currentProject.youtubeId && (
                      <>
                        <h3>Demo</h3>
                        <YoutubeEmbed videoId={currentProject.youtubeId} />
                      </>
                    )}
                    <button
                      onClick={closeModal}
                      className={styles.modalCloseBtn}
                    >
                      <FaX />
                    </button>
                  </div>
                )}
              </Modal>
            </div>
          </>
        )}
      </div>
      <div className="padding-left--lg padding-right--lg">
        <CustomFooter />
      </div>
    </Layout>
  );
}
