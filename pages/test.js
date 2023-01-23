import { useContext } from "react";
import { ProjectDataContext } from "../utils/ProjectDataContext";

export default function Test() {
  const [projectData, setProjectData, projectDataLoading] =
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
          setProjectData((old) => {
            return { ...old, id: old.id + 1 };
          })
        }
      >
        inc
      </button>
    </div>
  );
}
