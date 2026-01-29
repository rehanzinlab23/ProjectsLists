import { Search } from "lucide-react";

const Input = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full max-w-150 max-sm:hidden mx-auto relative flex items-center flex-col">
      <button className="absolute left-4 top-3 z-10">
        <Search className="text-white text-[20px] sm:text-[18px]" />
      </button>
      <input
        className="py-3 pr-5 pl-12.5 text-base rounded-[50px] border border-slate-700 bg-slate-800 hidden sm:flex outline-none text-white w-full"
        type="text"
        placeholder="Search Projects..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
