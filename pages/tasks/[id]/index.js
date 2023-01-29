import { useRouter } from "next/router";
import useProjectData from "../../../utils/ProjectDataContext";
import SecondaryButton from "../../../components/ui/SecondaryButton";
import Tag from "../../../components/ui/Tag";
import TableHeader from "../../../components/ui/TableHeader";
import TableData from "../../../components/ui/TableData";
import Link from "next/link";

export default function TaskViewPage() {
  const router = useRouter();
  const { id } = router.query;

  const [projectData, dispatch, loading] = useProjectData();

  const task = projectData.tasks.find((t) => t.id === parseInt(id));

  const handleUserToggle = (userId) => {
    const user = projectData.users.find(
      (u) => parseInt(u.id) === parseInt(userId)
    );

    dispatch({
      type: user.task_blacklist.includes(task.id)
        ? "USER_ALLOW_TASK"
        : "USER_DISALLOW_TASK",
      user: userId,
      task: task.id,
    });
  };

  if (loading || !task) {
    // TODO
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
      <div className={"mt-8 flex justify-between border-t pt-8"}>
        <div>
          <p className={"text-lg font-medium"}>{task.name}</p>
          <p className={"text-sm text-slate-300"}>{task.description}</p>
        </div>
        <div className={"flex items-center space-x-4"}>
          <Link href={`/tasks/${id}/edit`}>
            <SecondaryButton>Edit</SecondaryButton>
          </Link>
          <SecondaryButton
            onClick={(e) => {
              e.preventDefault();
              router.push("/tasks").then(() => {
                dispatch({
                  type: "DUPLICATE_TASK",
                  task: task,
                });
              });
            }}
          >
            Duplicate
          </SecondaryButton>
          <SecondaryButton
            onClick={(e) => {
              e.preventDefault();
              router.push("/tasks").then(() => {
                dispatch({
                  type: "REMOVE_TASK",
                  taskId: task.id,
                });
              });
            }}
          >
            Remove
          </SecondaryButton>
        </div>
      </div>
      <div className={"mt-4 flex items-center space-x-4"}>
        {task.category && (
          <Tag>
            {projectData.categories.find((c) => c.id === task.category).name}
          </Tag>
        )}
        <Tag>{task.weight} Points</Tag>
      </div>
      <div className={"mt-8"}>
        <table
          className={
            "w-1/2 divide-y-2 divide-slate-600 border border-slate-600"
          }
        >
          <thead className={"bg-slate-800"}>
            <tr>
              <TableHeader>User</TableHeader>
              <TableHeader>Allowed</TableHeader>
            </tr>
          </thead>
          <tbody className={"divide-y divide-slate-600"}>
            {projectData.users.map((u) => (
              <UserRow
                key={u.id}
                user={u}
                taskId={task.id}
                onToggle={handleUserToggle}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserRow({ user, taskId, onToggle }) {
  return (
    <tr>
      <TableData className={"flex flex-col items-start space-y-1"}>
        {user.name}
      </TableData>
      <TableData>
        <div className={"flex items-center space-x-4"}>
          <button
            className={"text-sm underline"}
            onClick={(e) => {
              e.preventDefault();
              onToggle(user.id);
            }}
          >
            {user.task_blacklist.includes(taskId) ? "No" : "Yes"}
          </button>
        </div>
      </TableData>
    </tr>
  );
}
