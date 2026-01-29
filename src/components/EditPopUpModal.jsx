import { Plus, X } from "lucide-react";
import { useState } from "react";

const EditPopupModal = ({ link, setProject, updateProject }) => {
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [imgUrl, setImgUrl] = useState(link.img || "");
  const handleUpdate = (e) => {
    e.preventDefault();
    updateProject(link.id, {
      title: title.trim(),
      url: url.trim(),
      img: imgUrl.trim(),
    });
  };

  const handleClose = () => setProject(null);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-full max-w-2xl max-h-[80vh] flex flex-col bg-slate-900 rounded-xl border border-slate-800 shadow-md p-5 relative duration-300">
        <div className="p-4 pb-3 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Edit Project</h2>
          <button
            onClick={handleClose}
            className="bg-slate-800 rounded-full h-10 w-10 flex items-center justify-center hover:bg-slate-700 border border-slate-700 cursor-pointer"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form className="flex flex-col w-full" onSubmit={handleUpdate}>
            <label className="block mb-2 text-lg font-bold text-gray-300">
              Project Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project Name"
              className="py-3 pl-3.5 text-base rounded-2xl border border-slate-700 bg-slate-800 outline-none text-white w-full"
            />
            <label className="block mb-1 mt-4 text-lg font-bold text-gray-300">
              URL Link
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL Link"
              required
              className="py-3 pl-3.5 text-base rounded-2xl border border-slate-700 bg-slate-800 outline-none text-white w-full"
            />
            <label className="block mb-1 mt-4 text-lg font-bold text-gray-300">
              Image Link (Optional)
            </label>
            <input
              type="url"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              placeholder="Image URL"
              className="py-3 pl-3.5 text-base rounded-2xl border border-slate-700 bg-slate-800 outline-none text-white w-full"
            />

            <div className="flex justify-between items-center mt-8">
              <button
                type="submit"
                className="flex items-center justify-center whitespace-nowrap rounded-2xl text-lg font-bold transition-colors h-16 text-white bg-slate-800 px-7 cursor-pointer hover:bg-slate-800/80"
              >
                <Plus className="mr-3 h-6 w-6" />
                Update Project
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="flex items-center justify-center whitespace-nowrap rounded-2xl text-lg font-bold transition-colors h-16 text-white bg-slate-800 px-7 cursor-pointer hover:bg-slate-800/80"
              >
                <X className="mr-3 h-6 w-6" />
                Cancel Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPopupModal;
