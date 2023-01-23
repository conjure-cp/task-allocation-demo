import "../styles/globals.css";
import Layout from "../components/layout";
import { ProjectDataContext } from "../utils/ProjectDataContext";
import useStickyReducer from "../utils/StickyStateHook";

function MyApp({ Component, pageProps }) {
  // TODO not sure what to put for reducer initial data argument
  const stickyReducer = useStickyReducer(
    projectDataReducer,
    { id: -1 },
    "workload_project_data"
  );

  return (
    <ProjectDataContext.Provider value={stickyReducer}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProjectDataContext.Provider>
  );
}

// TODO probably move this reducer
function projectDataReducer(projectData, action) {
  // TODO add actions
  switch (action.type) {
    case "inc_id_test":
      return { ...projectData, id: projectData.id + 1 };
    default:
      return projectData;
  }
}

export default MyApp;
