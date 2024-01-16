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
import YoutubeEmbed from "@site/src/components/YoutubeEmbed";
import {
  projects as projectsData,
  type Project,
  type Tags,
  type Chains,
} from "./projects";
import styles from "./index.module.css";

interface FilterOptions {
  tags: Tags[];
  chains: Chains[];
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
  });
  const [filter, setFilter] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  useEffect(() => {
    setProjects(projectsData);
    setLoading(false);
    const allTags = new Set();
    const allChains = new Set();

    projectsData.forEach((project) => {
      project.tags?.forEach((tag) => allTags.add(tag));
      project.chains?.forEach((chain) => allChains.add(chain));
    });

    const uniqueTags = Array.from(allTags) as Tags[];
    const uniqueChains = Array.from(allChains) as Chains[];
    setFilterOptions({ tags: uniqueTags, chains: uniqueChains });
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
        )
      );
    })
    .filter((project) => {
      // Filter based on the selected filter (if any)
      return (
        filter === "" ||
        project.tags?.includes(filter as Tags) ||
        project.chains?.includes(filter as Chains)
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
          Explore the ecosystem of projects building on the Tableland Network.
        </p>
        <hr />
        <input
          type="text"
          placeholder="Search projects by name, tags, or chain..."
          onChange={handleSearch}
          value={searchQuery}
          className={styles.searchInput}
        />
        <select onChange={handleFilterChange} className={styles.dropdownFilter}>
          <option value="">Filter by</option>
          <optgroup label="Tags">
            {filterOptions.tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
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
        </select>
        {loading && <div>Loading...</div>}
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
