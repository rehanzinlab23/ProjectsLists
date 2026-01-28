import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProjectCards from "./components/ProjectCards";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editProject, setEditProject] = useState(null);

  const [linksList, setLinksList] = useState(() => {
    const saved = localStorage.getItem("linksList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("linksList", JSON.stringify(linksList));
  }, [linksList]);

  const handleDelete = (id) => {
    setLinksList(linksList.filter((link) => link.id !== id));
  };

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

  return (
    <div>
      <Navbar
        onAddProject={addProject}
        linksList={linksList}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        editProject={editProject}
        setEditProject={setEditProject}
      />

      <ProjectCards
        linksList={linksList.filter((link) =>
          link.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )}
        onDelete={handleDelete}
        setEditProject={setEditProject}
      />
    </div>
  );
};

export default App;
