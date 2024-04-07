import Link from "next/link";
import useProjectData from "../../utils/ProjectDataContext";
import TableData from "../../components/ui/TableData";
import TableHeader from "../../components/ui/TableHeader";
import Tag from "../../components/ui/Tag";
import TaskActionButton from "../../components/tasks/TaskActionButton";

export default function TasksPage() {
  const [projectData, dispatch, loading] = useProjectData();

  const handleRemove = (taskId) => {
    dispatch({
      type: "REMOVE_TASK",
      taskId: taskId,
    });
  };

  const handleDuplicate = (task) => {
    dispatch({
      type: "DUPLICATE_TASK",
      task: task,
    });
  };

  if (loading) {
    return null;
  }

  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>Tasks Data</h1>
        <p className={"text-slate-300"}>
          Some description about how tasks data is used or whatever.
        </p>
      </div>
      <div className={"mt-8"}>
        <Link
          id="newTaskLink"
          href={"/tasks/new"}
          className={"border py-2 px-2 hover:underline"}
        >
          New Task
        </Link>
        <div className={"mt-4"}>
          {!projectData.tasks || projectData.tasks.length === 0 ? (
            <p className={"text-sm text-slate-300"}>
              There are currently no tasks in your project.
            </p>
          ) : (
            <table
              className={
                "w-full divide-y-2 divide-slate-600 border border-slate-600"
              }
            >
              <thead className={"bg-slate-800"}>
                <tr>
                  <TableHeader>Task</TableHeader>
                  <TableHeader>Category</TableHeader>
                  <TableHeader>Weight</TableHeader>
                  <TableHeader />
                </tr>
              </thead>
              <tbody className={"divide-y divide-slate-600"}>
                {projectData.tasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onRemove={handleRemove}
                    onDuplicate={handleDuplicate}
                    category={projectData.categories.find(
                      (c) => c.id === task.category,
                    )}
                    disabledActions={projectData.locked_tasks.includes(task.id)}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function TaskRow({ task, category, onRemove, onDuplicate, disabledActions }) {
  return (
    <tr>
      <TableData className={"flex flex-col items-start space-y-1"}>
        <Link href={`/tasks/${task.id}`}>
          <button className={"hover:underline"}>{task.name}</button>
        </Link>
        <p className={"text-sm text-slate-400"}>{task.description}</p>
      </TableData>
      <TableData>
        {category ? (
          category.name
        ) : (
          <span className={"text-sm text-slate-400"}>None</span>
        )}
      </TableData>
      <TableData>
        <Tag>{task.weight} Points</Tag>
      </TableData>
      <TableData>
        <div className={"flex items-center justify-end space-x-4"}>
          <Link href={disabledActions ? "#" : `/tasks/${task.id}/edit`}>
            <TaskActionButton disabled={disabledActions}>Edit</TaskActionButton>
          </Link>
          <TaskActionButton
            onClick={(e) => {
              e.preventDefault();
              onDuplicate(task);
            }}
          >
            Duplicate
          </TaskActionButton>
          <TaskActionButton
            onClick={(e) => {
              e.preventDefault();
              onRemove(task.id);
            }}
            disabled={disabledActions}
          >
            Remove
          </TaskActionButton>
        </div>
      </TableData>
    </tr>
  );
}
