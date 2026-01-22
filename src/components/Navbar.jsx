import SaveYourForm from "./SaveYourForm";
import InputBox from "./InputBox";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = ({ onAddProject, searchTerm, setSearchTerm }) => {
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="44px"
                viewBox="0 -960 960 960"
                width="44px"
                fill="#e3e3e3"
              >
                <path d="M320-280q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 320h240v-80H440v80Zm0-160h240v-80H440v80Zm0-160h240v-80H440v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
              </svg>
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
