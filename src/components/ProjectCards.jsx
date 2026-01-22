import { Presentation, X } from "lucide-react";
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

const ProjectCards = ({ linksList, onDelete }) => {
  if (linksList.length === 0) {
    return (
      <div className="py-20 text-center rounded-xl mt-32">
        <Presentation className="mx-auto text-gray-700 mb-2" size={48} />
        <p className="text-gray-600 font-bold uppercase text-3xl tracking-widest">
          No Projects Found Yet
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3">
      <div className="py-20 rounded-xl mt-6">
        <h2 className="text-4xl text-white font-semibold mb-8">
          Project Cards
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {linksList.map((link) => (
            <div
              key={link.id}
              className="bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 shadow-md p-5 flex flex-col transition relative duration-300 hover:scale-[1.02]"
            >
              <div className="h-18 w-18 bg-slate-800 border border-slate-700 rounded-full shrink-0 flex items-center justify-center">
                <img
                  src={link.img}
                  alt={link.title}
                  className=" max-w-9 max-h-9  "
                />
              </div>
              <h3 className="text-2xl mt-4 pl-3 font-bold capitalize text-white">
                {link.title}
              </h3>
              <div className="absolute top-4 right-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="bg-slate-800 rounded-full h-10 hover:bg-slate-700 border border-slate-700 cursor-pointer w-10 flex items-center justify-center">
                      <X size={20} className="text-white  " />
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
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
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(link.id)}
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
      </div>
    </div>
  );
};

export default ProjectCards;
