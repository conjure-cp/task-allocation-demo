import { createContext, useContext } from "react";

export const ProjectDataContext = createContext(null);

export default function useProjectData() {
  return useContext(ProjectDataContext);
}

/*

{
  id: 12,
  name: "CS School Work",
  tasks: [
    id: 0
    name: "Teach CS3102",
    description: "Some description about xyz",
    category: 2,
    weight: 26
  [,
  users: [],
  categories: []
}

*/
