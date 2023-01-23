import { useContext } from "react";
import { ProjectDataContext } from "../utils/ProjectDataContext";

export default function Test() {
  // const [projectData, setProjectData, projectDataLoading] =
  //   useContext(ProjectDataContext);

  const [projectData, dispatch, projectDataLoading] =
    useContext(ProjectDataContext);

  if (projectDataLoading) {
    return <p>content loading</p>;
  }

  return (
    <div>
      <p>count is currently {projectData.id}</p>
      <button
        className={"border"}
        onClick={() =>
          // setProjectData((old) => {
          //   return { ...old, id: old.id + 1 };
          // })
          dispatch({ type: "inc_id_test" })
        }
      >
        inc
      </button>
    </div>
  );
}
