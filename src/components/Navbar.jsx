import logo from "../assets/logo.png";
import SaveYourForm from "./SaveYourForm";
import InputBox from "./InputBox";

const Navbar = ({ onAddProject, searchTerm, setSearchTerm }) => {
  return (
    <nav className="bg-slate-800 w-full flex px-3 py-4 mb-32">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full items-center">
        <div className="hidden items-center sm:flex">
          <img src={logo} alt="logo" height={50} width={50} />
          <h1 className="text-white text-2xl text-center uppercase font-bold">
            Project Lists
          </h1>
        </div>
        <InputBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex sm:justify-end justify-center items-center">
          <SaveYourForm onAddProject={onAddProject} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
