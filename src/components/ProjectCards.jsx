import { CircleAlert, X, Pencil } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useProjects } from "../context/use-project";

const ProjectCards = () => {
  const {
    handleDelete,
    setEditProject,
    filteredLinks,
    sortAZ,
    visible,
    setVisible,
  } = useProjects();

  if (filteredLinks.length === 0) {
    return (
      <div className="min-h-[78vh] flex flex-col items-center justify-center">
        <div className="relative w-28 h-28 rounded-full flex items-center justify-center mb-6">
          <span className="shrink-0 bg-slate-800 border border-slate-700 rounded-full h-30 w-30 flex items-center justify-center">
            <CircleAlert size={64} strokeWidth={1.5} className="text-white" />
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl text-center font-extrabold leading-tight mb-2 text-white">
          Project Not Found
        </h1>
        <p className="max-w-2xl text-gray-500 text-sm text-center">
          The project you're looking for doesn't exist or has been removed.
          Click on the button to add a new project.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3">
      <div className="py-20 rounded-xl mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl text-white font-semibold mb-8">
            Project Cards
          </h2>
          <button
            onClick={sortAZ}
            className="mb-8 flex items-center justify-center whitespace-nowrap rounded-full text-base font-bold transition-colors disabled:pointer-events-none disabled:opacity-50 text-white bg-slate-800 px-7 cursor-pointer h-14 hover:bg-slate-800/80"
          >
            Sort A-Z
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {filteredLinks.slice(0, visible).map((link) => (
            <div
              key={link.id}
              className="group bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 shadow-md p-5 flex flex-col transition relative duration-300 hover:scale-[1.02]"
            >
              <div className="h-18 w-18 bg-slate-800 border border-slate-700 rounded-full shrink-0 flex items-center justify-center">
                <img
                  src={link.img}
                  alt={link.title}
                  className="max-w-9 max-h-9 rounded-full"
                />
              </div>
              <h3 className="text-2xl mt-4 pl-3 font-bold capitalize text-white wrap-break-word">
                {link.title}
              </h3>
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                <button
                  onClick={() => setEditProject(link)}
                  className="bg-slate-800 rounded-full h-10 hover:bg-slate-700 border border-slate-700 cursor-pointer w-10 flex items-center justify-center"
                >
                  <Pencil size={18} className="text-white" />
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="bg-slate-800 rounded-full h-10 hover:bg-slate-700 border border-slate-700 cursor-pointer w-10 flex items-center justify-center">
                      <X size={20} className="text-white" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-slate-800">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete "{link.title}"?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this project.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-transparent text-white border border-slate-600">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(link.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 border mt-4 text-center border-slate-700 text-white"
              >
                Visit Website
              </a>
            </div>
          ))}
        </div>
        {visible < filteredLinks.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setVisible((prev) => prev + 8)}
              className="flex items-center justify-center whitespace-nowrap rounded-full text-base font-bold transition-colors disabled:pointer-events-none disabled:opacity-50 text-white bg-slate-800 px-7 cursor-pointer h-14 hover:bg-slate-800/80"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCards;
