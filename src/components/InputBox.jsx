import { Search } from "lucide-react";

const InputBox = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full max-w-150  mx-auto relative flex items-center">
      <Search
        size={20}
        className="absolute left-5 z-10 text-white text-[18px] cursor-pointer"
      />
      <input
        className="py-3 pr-5  pl-12.5 text-base rounded-[50px] border border-slate-700 bg-slate-800 outline-none  text-white w-full"
        type="text"
        placeholder="Search Projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default InputBox;
