import { Plus, X } from "lucide-react";
import { useState } from "react";

const SaveYourForm = ({ onAddProject, isOpen, setIsOpen }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [ImgUrl, setImgUrl] = useState("");

  const handleImgUrlChange = (e) => {
    setImgUrl(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ((title && url) || ImgUrl) {
      onAddProject(title, url, ImgUrl);
      setTitle("");
      setUrl("");
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center justify-center whitespace-nowrap rounded-full text-base font-bold  transition-colors disabled:pointer-events-none disabled:opacity-50 text-white bg-slate-800 px-7 cursor-pointer h-14 hover:bg-slate-800/80"
      >
        <Plus className="mr-3 h-6 w-6" />
        <span>Add new Project</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Save Your Projects
              </h2>
              <button className="p-2 rounded-full hover:bg-gray-700">
                <X
                  onClick={() => setIsOpen(false)}
                  size={24}
                  className="text-gray-300 cursor-pointer"
                />
              </button>
            </div>
            {/* Modal */}
            <div className="p-6 overflow-y-auto">
              <form
                className="flex justify-center shrink-0 flex-col w-full"
                type="submit"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                />
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                />

                <label
                  htmlFor="url"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                />

                <button
                  type="submit"
                  className="flex mt-4 items-center justify-center whitespace-nowrap rounded-2xl text-lg font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-slate-900 bg-white px-6 cursor-pointer h-16"
                >
                  <Plus size={18} className="mr-2" />
                  <span className="mt-1">Add Project</span>
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
