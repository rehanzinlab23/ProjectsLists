import { Search } from "lucide-react";
import { useState } from "react";

const Input = ({ searchTerm, setSearchTerm }) => {
  const [error, setError] = useState("");

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      if (searchTerm.trim() === "") {
        setError("Input cannot be empty!");
      } else {
        setError("");
      }
    }
  };

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
          if (error) setError("");
        }}
        onKeyDown={handleEnter}
      />
      <div>{error && <p className="mt-2 text-red-500 text-sm">{error}</p>}</div>
    </div>
  );
};

export default Input;
