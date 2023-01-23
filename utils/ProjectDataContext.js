import { createContext, useContext } from "react";

export const ProjectDataContext = createContext(null);

export default function useProjectData() {
  return useContext(ProjectDataContext);
}

/*

{
  id: 12,
  name: "CS School Work",
  tasks: {},
  users: {},
  categories: {}
}

*/
