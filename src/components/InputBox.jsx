import { Search } from "lucide-react";

const InputBox = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full max-w-150 mt-7 mb-2.5 mx-auto relative flex items-center">
      <Search
        size={20}
        className="absolute left-5 z-10 text-[#666] text-[18px] cursor-pointer"
      />
      <input
        className="pt-4 pr-5 pb-4 pl-12.5 rounded-[50px] border border-gray-300 bg-white outline-none text-2xl text-gray-700 w-full"
        type="text"
        placeholder="Search Projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default InputBox;
