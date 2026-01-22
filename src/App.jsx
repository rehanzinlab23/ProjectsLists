import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProjectCards from "./components/ProjectCards";
import toast, { Toaster } from "react-hot-toast";

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

    const value = title.trim();

    const isExist = linksList.some(
      (link) => link.title.toLowerCase() === value.toLowerCase(),
    );

    if (isExist) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-custom-enter" : "animate-custom-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://media.istockphoto.com/id/1201202836/vector/dirty-grunge-hand-drawn-with-brush-strokes-cross-x-vector-illustration-isolated-on-white.jpg?s=612x612&w=0&k=20&c=gt_7zKbzu7yaUhtA10wzTSfIdkdqHrOlNAY65lqYWa8="
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-red-900">
                  Project already exists.
                </p>
                <p className="mt-1 text-sm text-red-500">
                  Please change your project name.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border cursor-pointer border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
      return;
    }

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
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
