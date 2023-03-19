import { createContext, useContext } from "react";

export const ProjectDataContext = createContext(null);

export default function useProjectData() {
  return useContext(ProjectDataContext);
}
