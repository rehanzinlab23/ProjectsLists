import { useEffect, useState } from "react";
import Input from "./Input";
import InputBox from "./InputBox";
import SaveYourForm from "./SaveYourForm";
import SVGComponent from "./SvgComponent";
import { Plus } from "lucide-react";
import { useProjects } from "../context/use-project";

const Navbar = () => {
  const {
    searchTerm,
    setSearchTerm,
    linksList,
    editProject,
    setEditProject,
    addProject,
  } = useProjects();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <nav className="relative flex py-5 bg-slate-900 mb-6">
        <div className="container mx-auto px-3">
          <div className="flex justify-between items-center gap-4 w-full">
            <div className="flex items-center gap-2">
              <SVGComponent />
              <span className="text-white text-xl text-center uppercase font-semibold">
                Project Lists
              </span>
            </div>
            <Input searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="justify-end flex items-center">
              <InputBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <SaveYourForm
                onAddProject={addProject}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                linksList={linksList}
                editProject={editProject}
                setEditProject={setEditProject}
              />
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-white h-16 w-16 rounded-full flex sm:hidden fixed right-4 bottom-4 items-center justify-center z-50">
        <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
          <Plus size={30} className="text-slate-800" />
        </button>
      </div>
    </>
  );
};

export default Navbar;
