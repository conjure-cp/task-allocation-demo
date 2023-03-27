import useProjectData from "../../utils/ProjectDataContext";
import { TaskCreator } from "../../components/tasks/TaskCreateEdit";
import { useRouter } from "next/router";

export default function NewTaskPage() {
  const [projectData, dispatch, loading] = useProjectData();
  const router = useRouter();

  if (loading) {
    return null;
  }

  const handleSubmit = (name, description, category, weight) => {
    dispatch({
      type: "ADD_TASK",
      name: name,
      description: description,
      category: category,
      weight: weight,
    });
    router.push("/tasks");
  };

  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>New Task</h1>
        <p className={"text-slate-300"}>
          Some description about how tasks data is used or whatever.
        </p>
      </div>
      <TaskCreator projectData={projectData} onSubmit={handleSubmit} />
    </div>
  );
}
