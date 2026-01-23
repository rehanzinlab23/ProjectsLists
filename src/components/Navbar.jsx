import SaveYourForm from "./SaveYourForm";
import InputBox from "./InputBox";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import SVGComponent from "./SvgComponent";

const Navbar = ({ onAddProject, searchTerm, setSearchTerm, linksList }) => {
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full items-center">
            <div className="flex items-center gap-2">
              <SVGComponent />
              <span className="text-white text-xl text-center uppercase font-semibold whitespace-nowrap">
                Project Lists
              </span>
            </div>
            <InputBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="sm:justify-end flex items-center">
              <SaveYourForm
                onAddProject={onAddProject}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                linksList={linksList}
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
