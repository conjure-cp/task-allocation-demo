import { useRouter } from "next/router";
import useProjectData from "../../../utils/ProjectDataContext";
import Link from "next/link";
import SecondaryButton from "../../../components/ui/SecondaryButton";
import TableHeader from "../../../components/ui/TableHeader";
import TableData from "../../../components/ui/TableData";
import Tag from "../../../components/ui/Tag";

export default function UserViewPage() {
  const router = useRouter();
  const { id } = router.query;

  const [projectData, dispatch, loading] = useProjectData();

  const user = projectData.users.find((u) => u.id === parseInt(id));

  if (loading || !user) {
    // TODO
    return null;
  }

  return (
    <div>
      <div className={"flex items-center justify-between"}>
        <div>
          <p
            className={
              "pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500"
            }
          >
            User
          </p>
          <h1 className={"text-2xl font-semibold"}>{user.name}</h1>
        </div>
        <div className={"flex items-center space-x-4"}>
          <Link href={`/users/${id}/edit`}>
            <SecondaryButton>Edit</SecondaryButton>
          </Link>
          <SecondaryButton
            onClick={(e) => {
              e.preventDefault();
              router.push("/users").then(() => {
                dispatch({
                  type: "DUPLICATE_USER",
                  user: user,
                });
              });
            }}
          >
            Duplicate
          </SecondaryButton>
          <SecondaryButton
            onClick={(e) => {
              e.preventDefault();
              router.push("/users").then(() => {
                dispatch({
                  type: "REMOVE_USER",
                  userId: user.id,
                });
              });
            }}
          >
            Remove
          </SecondaryButton>
        </div>
      </div>
      <div className={"mt-8"}>
        <p className={"mb-4 font-medium"}>Categories</p>
        <table
          className={
            "w-1/3 divide-y-2 divide-slate-600 border border-slate-600"
          }
        >
          <thead className={"bg-slate-800"}>
            <tr>
              <TableHeader>Category</TableHeader>
              <TableHeader>Proportion</TableHeader>
            </tr>
          </thead>
          <tbody className={"divide-y divide-slate-600"}>
            {user.categories.map((c) => (
              <CategoryRow
                key={c.id}
                category={projectData.categories.find(
                  (x) => x.id === parseInt(c.id)
                )}
                percentage={c.percentage}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className={"mt-12"}>
        <div className={"mb-4 flex items-center space-x-2"}>
          <p className={"font-medium"}>Possible Tasks</p>
          <Tag>3/4</Tag>
        </div>
        <table
          className={
            "w-1/2 divide-y-2 divide-slate-600 border border-slate-600"
          }
        >
          <thead className={"bg-slate-800"}>
            <tr>
              <TableHeader>Task</TableHeader>
              <TableHeader>Allowed</TableHeader>
            </tr>
          </thead>
          <tbody className={"divide-y divide-slate-600"}>
            {projectData.tasks.map((t) => (
              <TaskRow
                key={t.id}
                task={t}
                allowed={!user.task_blacklist.includes((x) => x === t.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className={"mt-12"}>
        <p className={"mb-4 font-medium"}>Preferences</p>
        <table
          className={
            "w-1/2 divide-y-2 divide-slate-600 border border-slate-600"
          }
        >
          <thead className={"bg-slate-800"}>
            <tr>
              <TableHeader></TableHeader>
              <TableHeader>Task</TableHeader>
            </tr>
          </thead>
          <tbody className={"divide-y divide-slate-600"}>
            {user.preferences.map((x, i) => (
              <PreferenceRow
                key={i}
                num={i + 1}
                task={projectData.tasks.find((t) => t.id === x)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PreferenceRow({ num, task }) {
  return (
    <tr>
      <TableData className={"text-center text-sm"}>#{num}</TableData>
      <TableData className={"flex flex-col items-start space-y-1"}>
        <Link href={`/tasks/${task.id}`}>
          <button className={"hover:underline"}>{task.name}</button>
        </Link>
        <p className={"text-sm text-slate-400"}>{task.description}</p>
      </TableData>
    </tr>
  );
}

function TaskRow({ task, allowed }) {
  return (
    <tr>
      <TableData className={"flex flex-col items-start space-y-1"}>
        <Link href={`/tasks/${task.id}`}>
          <button className={"hover:underline"}>{task.name}</button>
        </Link>
        <p className={"text-sm text-slate-400"}>{task.description}</p>
      </TableData>
      <TableData className={"text-sm"}>{allowed ? "Yes" : "No"}</TableData>
    </tr>
  );
}

function CategoryRow({ category, percentage }) {
  return (
    <tr>
      <TableData>
        <Link href={`/categories/${category.id}`}>
          <button className={"hover:underline"}>{category.name}</button>
        </Link>
      </TableData>
      <TableData>
        <Tag>{percentage}%</Tag>
      </TableData>
    </tr>
  );
}
