import { useRouter } from "next/router";
import useProjectData from "../../../utils/ProjectDataContext";
import { TaskEditor } from "../../../components/tasks/TaskCreateEdit";
import { useEffect } from "react";

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = router.query;

  const [projectData, dispatch, loading] = useProjectData();

  const task = projectData.tasks.find((t) => t.id === parseInt(id));

  useEffect(() => {
    if (!loading && task && projectData.locked_tasks.includes(task.id)) {
      router.push("/");
    }
  });

  const handleSubmit = (name, description, category, weight) => {
    dispatch({
      type: "EDIT_TASK",
      taskId: task.id,
      name: name,
      description: description,
      category: category,
      weight: weight,
    });
    router.push(`/tasks/${id}`);
  };

  if (loading || !task) {
    return null;
  }

  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>Edit Task</h1>
        <p className={"text-slate-300"}>
          Some description about how tasks data is used or whatever.
        </p>
      </div>
      <TaskEditor
        projectData={projectData}
        task={task}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
