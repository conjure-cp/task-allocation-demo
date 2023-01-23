import "../styles/globals.css";
import Layout from "../components/layout";
import { useReducer } from "react";
import {
  ProjectDataContext,
  ProjectDataDispatchContext,
} from "../utils/ProjectDataContext";
import useStickyState from "../utils/StickyStateHook";

function MyApp({ Component, pageProps }) {
  // // TODO not sure what to put for reducer initial data argument
  // const [projectData, dispatch] = useReducer(projectDataReducer, { id: -1 });

  const stickyState = useStickyState({ id: -1 }, "workload_project_data");

  return (
    <ProjectDataContext.Provider value={stickyState}>
      {/*<ProjectDataDispatchContext.Provider value={dispatch}>*/}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/*</ProjectDataDispatchContext.Provider>*/}
    </ProjectDataContext.Provider>
  );
}

// // TODO probably move this reducer
// function projectDataReducer(projectData, action) {
//   switch (action.type) {
//     // TODO add actions
//     default:
//       return projectData;
//   }
// }

export default MyApp;
