import Input from "../components/ui/Input";
import PrimaryButton from "../components/ui/PrimaryButton";
import useProjectData from "../utils/ProjectDataContext";

export default function Home() {
  const [projectData, dispatch, loading] = useProjectData();

  if (loading || !projectData) {
    // TODO implement a loading spinner or something
    return null;
  }

  if (projectData.id === -1) {
    // new project
    // TODO unsure what "id" really means yet, probably will need to change this "no project" state
    return (
      <div>
        <div>
          <h1 className={"text-2xl font-semibold"}>New Project</h1>
          <p className={"text-slate-300"}>
            Start by creating a new project to which tasks, users and categories
            can be added.
          </p>
          <div className={"mt-8 space-y-8"}>
            <Input label={"Name"} placeholder={"School of CS Workload"} />
            <PrimaryButton onClick={() => dispatch({ type: "NEW_PROJECT" })}>
              Create Project
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>{projectData.name}</h1>
        <p className={"text-slate-300"}>
          An overview of the details of your project are displayed below.
        </p>
        <div className={"mt-8 space-y-8"}>todo</div>
      </div>
    </div>
  );
}
