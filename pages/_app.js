import "../styles/globals.css";
import Layout from "../components/layout";
import { ProjectDataContext } from "../utils/ProjectDataContext";
import useStickyReducer from "../utils/StickyStateHook";
import projectDataReducer from "../utils/ProjectDataReducer";

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

export default MyApp;
