import { createContext, useContext, useState, useEffect } from "react";

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editProject, setEditProject] = useState(null);
  const [linksList, setLinksList] = useState(() => {
    const saved = localStorage.getItem("linksList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("linksList", JSON.stringify(linksList));
  }, [linksList]);

  const addProject = (title, url, img) => {
    const domain = new URL(url).hostname;
    const size = 64;

    if (editProject) {
      setLinksList(
        linksList.map((link) =>
          link.id === editProject.id
            ? {
                ...link,
                title,
                url,
                img:
                  img ||
                  `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`,
              }
            : link,
        ),
      );
      setEditProject(null);
    } else {
      const newLink = {
        id: Date.now(),
        title,
        img:
          img ||
          `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`,
        url,
      };
      setLinksList([...linksList, newLink]);
    }
  };

  const handleDelete = (id) => {
    setLinksList(linksList.filter((link) => link.id !== id));
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
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
