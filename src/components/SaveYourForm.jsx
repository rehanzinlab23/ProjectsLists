import { Plus, X } from "lucide-react";
import { useState, useEffect } from "react";

const SaveYourForm = ({
  onAddProject,
  isOpen,
  setIsOpen,
  linksList,
  editProject,
}) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [ImgUrl, setImgUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (title.trim() === "") {
      setError("");
      return;
    }

    const lower = title.toLowerCase().trim();

    const exists = linksList.some((link) => {
      if (editProject && link.id === editProject.id) {
        return false;
      }
      return link.title.toLowerCase() === lower;
    });

    if (exists) {
      setError("Project already exists!");
    } else {
      setError("");
    }
  }, [title, linksList, editProject]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImgUrlChange = (e) => setImgUrl(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);

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

  const ModalClose = () => {
    setTitle("");
    setUrl("");
    setImgUrl("");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center justify-center whitespace-nowrap rounded-full text-base font-bold transition-colors disabled:pointer-events-none disabled:opacity-50 text-white bg-slate-800 px-7 cursor-pointer h-14 hover:bg-slate-800/80"
      >
        <Plus className="mr-3 h-6 w-6" />
        <span>Add Project</span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="w-full max-w-2xl max-h-[80vh] flex flex-col bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 shadow-md p-5 transition relative duration-300">
            <div className="p-4 pb-3 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Save Your Projects
              </h2>
              <button
                onClick={ModalClose}
                className="bg-slate-800 rounded-full h-10 hover:bg-slate-700 border border-slate-700 cursor-pointer w-10 flex items-center justify-center"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
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
                  placeholder="Project Name"
                  className="py-3 pl-3.5 text-base rounded-2xl border border-slate-700 bg-slate-800 outline-none text-white w-full"
                />
                {error && <p className="text-red-500 mt-1">{error}</p>}
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
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8">
                  <button
                    type="submit"
                    disabled={!!error}
                    className="flex items-center justify-center grow whitespace-nowrap rounded-2xl text-lg font-bold transition-colors disabled:pointer-events-none disabled:opacity-50 h-16 text-white bg-slate-800 px-7 cursor-pointer hover:bg-slate-800/80"
                  >
                    <Plus className="mr-3 h-6 w-6" />
                    <span>Add Project</span>
                  </button>
                  <button
                    onClick={ModalClose}
                    type="submit"
                    className="flex items-center justify-center grow whitespace-nowrap rounded-2xl text-lg font-bold transition-colors disabled:pointer-events-none disabled:opacity-50 h-16 text-white bg-slate-800 px-7 cursor-pointer hover:bg-slate-800/80"
                  >
                    <X className="mr-3 h-6 w-6" />
                    <span>Cancel Project</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveYourForm;
