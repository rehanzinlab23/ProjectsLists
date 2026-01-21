import { Presentation, X } from "lucide-react";

const ProjectCards = ({ linksList, onDelete }) => {
  if (linksList.length === 0) {
    return (
      <div className="py-20 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-xl mt-6">
        <Presentation
          className="mx-auto text-gray-200 dark:text-gray-700 mb-2"
          size={48}
        />
        <p className="text-gray-600 font-bold uppercase text-3xl tracking-widest">
          No Projects Found Yet
        </p>
      </div>
    );
  }

  return (
    <div className="py-20 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-xl mt-6">
      <h2 className="text-3xl text-gray-600 font-bold text-center mb-8">
        Project Cards
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {linksList.map((link) => (
          <div
            key={link.id}
            className="bg-slate-800 rounded-lg shadow-md p-6 flex flex-col items-center"
          >
            <div className="flex justify-between items-center w-full mb-4">
              <div></div>
              <h3 className="text-2xl font-bold mb-2 uppercase text-center text-white">
                {link.title}
              </h3>
              <button onClick={() => onDelete(link.id)}>
                {" "}
                <X
                  size={24}
                  className="text-gray-300 cursor-pointer hover:bg-gray-600 hover:rounded-full p-1 mb-3"
                />
              </button>
            </div>
            <img src={link.img} alt="Website Image" />
            <a
              href={link.url}
              target="_blank"
              className="text-blue-500 underline"
            >
              Visit Website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCards;
