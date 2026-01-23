import { Plus, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const SaveYourForm = ({ onAddProject, isOpen, setIsOpen, linksList }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [ImgUrl, setImgUrl] = useState("");
  const [error, setError] = useState("");
  const [suggestionData, setSuggestionData] = useState([]);
  const [suggestionSelectedItem, setSuggestionSelectedItem] = useState(-1);
  const containerRef = useRef(null);
  const SocialApps = [
    "YouTube",
    "Google",
    "GitHub",
    "Facebook",
    "Instagram",
    "Twitter",
    "TikTok",
    "LinkedIn",
    "Snapchat",
    "Pinterest",
    "Reddit",
    "Discord",
    "Twitch",
    "Spotify",
    "Netflix",
    "WhatsApp",
    "Telegram",
    "Stackoverflow",
  ];

  useEffect(() => {
    if (title.trim() === "") {
      setError("");
      return;
    }
    const lower = title.toLowerCase().trim();
    const exists = linksList.some((link) => link.title.toLowerCase() === lower);
    if (exists) {
      setError("Project already exists!");
    } else {
      setError("");
    }
  }, [title, linksList]);

  useEffect(() => {
    if (title.trim() !== "") {
      const filtered = SocialApps.filter((app) =>
        app.toLowerCase().includes(title.toLowerCase()),
      );
      setSuggestionData(filtered);
    } else {
      setSuggestionData([]);
    }
  }, [title]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImgUrlChange = (e) => setImgUrl(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);

  const handleKeyDown = (e) => {
    if (suggestionData.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSuggestionSelectedItem((prev) => {
          const nextIndex = prev < suggestionData.length - 1 ? prev + 1 : 0;
          const container = containerRef.current;
          const item = container.children[nextIndex];
          if (item) {
            item.scrollIntoView({ block: "nearest" });
          }
          return nextIndex;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSuggestionSelectedItem((prev) =>
          prev > 0 ? prev - 1 : suggestionData.length - 1,
        );
      } else if (e.key === "Enter" && suggestionSelectedItem >= 0) {
        e.preventDefault();
        setTitle(suggestionData[suggestionSelectedItem]);
        setSuggestionData([]);
        setSuggestionSelectedItem(-1);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) return;
    if ((title && url) || ImgUrl) {
      onAddProject(title, url, ImgUrl);
      setTitle("");
      setUrl("");
      setImgUrl("");
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center justify-center whitespace-nowrap rounded-full text-base font-bold transition-colors disabled:pointer-events-none disabled:opacity-50 text-white bg-slate-800 px-7 cursor-pointer h-14 hover:bg-slate-800/80"
      >
        <Plus className="mr-3 h-6 w-6" />
        <span>Add new Project</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="w-full max-w-2xl max-h-[80vh] flex flex-col bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 shadow-md p-5 transition relative duration-300">
            {/* Header */}
            <div className="p-4 pb-3 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Save Your Projects
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-slate-800 rounded-full h-10 hover:bg-slate-700 border border-slate-700 cursor-pointer w-10 flex items-center justify-center"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
            {/* Modal */}
            <div className="p-6 overflow-y-auto">
              <form
                className="flex justify-center shrink-0 flex-col w-full"
                onSubmit={handleSubmit}
              >
                <label
                  htmlFor="title"
                  className="block mb-2 text-lg font-bold text-gray-300"
                >
                  Project Name
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Project Name"
                  className="py-3 pl-3.5 text-base rounded-2xl border border-slate-700 bg-slate-800 outline-none text-white w-full"
                />
                {error && <p className="text-red-500 mt-1">{error}</p>}

                <div className="relative">
                  <div
                    ref={containerRef}
                    className="absolute left-0 right-0 mt-2 bg-[#0f172a]/95 backdrop-blur-xl border-none rounded-xl shadow-xl max-h-48 overflow-y-auto z-50"
                  >
                    {suggestionData.map((name, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setTitle(name);
                          setSuggestionData([]);
                          setSuggestionSelectedItem(-1);
                        }}
                        className={`px-4 py-2 cursor-pointer transition-colors ${
                          suggestionSelectedItem === index
                            ? "bg-white/10 text-white"
                            : "text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>

                <label
                  htmlFor="url"
                  className="block mb-1 mt-4 text-lg font-bold text-gray-300"
                >
                  Enter URL Link
                </label>
                <input
                  id="url"
                  type="url"
                  placeholder="URL Link"
                  value={url}
                  onChange={handleUrlChange}
                  required
                  className="py-3 pl-3.5 text-base rounded-2xl border border-slate-700 bg-slate-800 outline-none text-white w-full"
                />

                <label
                  htmlFor="img"
                  className="block mb-1 mt-4 text-lg font-bold text-gray-300"
                >
                  Enter Image Link (Optional)
                </label>
                <input
                  id="img"
                  type="url"
                  placeholder="Image URL"
                  value={ImgUrl}
                  onChange={handleImgUrlChange}
                  className="py-3 pl-3.5 text-base rounded-2xl border border-slate-700 bg-slate-800 outline-none text-white w-full"
                />

                <button
                  type="submit"
                  disabled={!!error}
                  className="flex mt-8 items-center justify-center whitespace-nowrap rounded-2xl text-lg font-bold transition-colors disabled:pointer-events-none disabled:opacity-50 h-16 text-white bg-slate-800 px-7 cursor-pointer hover:bg-slate-800/80"
                >
                  <Plus className="mr-3 h-6 w-6" />
                  <span>Add Project</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveYourForm;
