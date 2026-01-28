import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function InputBox({ searchTerm, setSearchTerm }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      if (searchTerm.trim() === "") {
        setError("Input cannot be empty!");
      } else {
        setError("");
        setOpen(false);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-white text-xl cursor-pointer sm:hidden"
      >
        <Search className="text-white text-[20px] sm:text-[18px]" />
      </button>
      {open && (
        <div className="fixed inset-0 z-9999 bg-black/80 backdrop-blur-md flex items-center justify-center">
          <button
            onClick={() => setOpen(false)}
            className="absolute right-2 top-3 text-white text-5xl cursor-pointer"
          >
            <X size={40} />
          </button>
          <div className="text-center text-white">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Projects..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={handleEnter}
              className="w-105 max-w-[90vw] bg-transparent text-4xl text-white font-bold placeholder:text-white border-b border-[rgba(255,255,255,0.13)] outline-none py-2"
            />
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
            <p className="mt-4 text-sm text-white/70">
              Type above and press <b className="text-white">Enter</b> to
              search.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
