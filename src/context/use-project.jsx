import { createContext, useContext } from "react";
export const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);
