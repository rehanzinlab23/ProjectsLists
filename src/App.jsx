import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProjectCards from "./components/ProjectCards";

const App = () => {
  const [linksList, setLinksList] = useState(() => {
    const saved = localStorage.getItem("linksList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("linksList", JSON.stringify(linksList));
  }, [linksList]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    setLinksList(linksList.filter((link) => link.id !== id));
  };

  const addProject = (title, url, img) => {
    const domain = new URL(url).hostname;
    const size = 64;

    const newLink = {
      id: Date.now(),
      title,
      img:
        img || `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`,
      url,
    };

    setLinksList([...linksList, newLink]);
  };

  return (
    <div>
      <Navbar
        onAddProject={addProject}
        linksList={linksList}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <ProjectCards
        linksList={linksList.filter((link) =>
          link.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
