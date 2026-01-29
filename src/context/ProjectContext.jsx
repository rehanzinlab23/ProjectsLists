import { links } from "@/lib/links";
import { useEffect, useState } from "react";
import { ProjectContext } from "./use-project";
import EditPopupModal from "@/components/EditPopUpModal";

export const ProjectProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editProject, setEditProject] = useState(null);
  const [linksList, setLinksList] = useState([]);
  const [visible, setVisible] = useState(8);

  const sortAZ = () => {
    const sorted = [...linksList].sort((a, b) =>
      a.title.localeCompare(b.title),
    );
    setLinksList(sorted);
    links.setToLocalStorage(sorted);
  };

  useEffect(() => {
    function init() {
      const link = links.getFromLocalStorage();
      setLinksList(link);
    }
    init();
  }, []);

  const filteredLinks = linksList.filter((link) =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const updateProject = (id, updatedData) => {
    const updatedLinks = linksList.map((link) =>
      link.id === id ? { ...link, ...updatedData } : link,
    );
    setLinksList(updatedLinks);
    links.setToLocalStorage(updatedLinks);
    setEditProject(null);
  };

  const addProject = (title, url, img) => {
    if (editProject) {
      const updated = linksList.map((link) =>
        link.id === editProject.id ? { ...link, title, url, img } : link,
      );
      setLinksList(updated);
      links.setToLocalStorage(updated);
      setEditProject(null);
    } else {
      const domain = new URL(url).hostname;
      const size = 64;
      const newLink = {
        id: Date.now(),
        title,
        img:
          img ||
          `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`,
        url,
      };
      const updatedLinks = [...linksList, newLink];
      setLinksList(updatedLinks);
      links.setToLocalStorage(updatedLinks);
    }
  };

  const handleDelete = (id) => {
    setLinksList(linksList.filter((link) => link.id !== id));
    links.removeItem(id);
  };

  return (
    <ProjectContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        editProject,
        setEditProject,
        linksList,
        setLinksList,
        addProject,
        handleDelete,
        updateProject,
        filteredLinks,
        sortAZ,
        visible,
        setVisible,
      }}
    >
      {children}
      {editProject && (
        <EditPopupModal
          link={editProject}
          setProject={setEditProject}
          linksList={linksList}
          updateProject={updateProject}
        />
      )}
    </ProjectContext.Provider>
  );
};
