import Link from "next/link";
import useProjectData from "../../utils/ProjectDataContext";
import TableData from "../../components/ui/TableData";
import TableHeader from "../../components/ui/TableHeader";

export default function UsersPage() {
  const [projectData, dispatch, loading] = useProjectData();

  const handleRemove = (userId) => {
    dispatch({
      type: "REMOVE_USER",
      userId: userId,
    });
  };

  const handleDuplicate = (user) => {
    dispatch({
      type: "DUPLICATE_USER",
      user: user,
    });
  };

  if (loading) {
    return null;
  }

  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>Users Data</h1>
        <p className={"text-slate-300"}>
          Some description about how users data is used or whatever.
        </p>
      </div>
      <div className={"mt-8"}>
        <Link
          href={"/users/new"}
          className={"border py-2 px-2 hover:underline"}
        >
          New User
        </Link>
        <div className={"mt-4"}>
          {!projectData.users || projectData.users.length === 0 ? (
            <p className={"text-sm text-slate-300"}>
              There are currently no users in your project.
            </p>
          ) : (
            <table
              className={
                "w-full divide-y-2 divide-slate-600 border border-slate-600"
              }
            >
              <thead className={"bg-slate-800"}>
                <tr>
                  <TableHeader>User</TableHeader>
                  <TableHeader>Task Categories</TableHeader>
                  <TableHeader>Possibilities</TableHeader>
                  <TableHeader>Preferences</TableHeader>
                  <TableHeader />
                </tr>
              </thead>
              <tbody className={"divide-y divide-slate-600"}>
                {projectData.users.map((u, i) => (
                  <UserRow
                    key={i}
                    user={u}
                    tasks={projectData.tasks}
                    categories={projectData.categories}
                    handleRemove={handleRemove}
                    handleDuplicate={handleDuplicate}
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

function UserRow({ user, tasks, categories, handleRemove, handleDuplicate }) {
  return (
    <tr>
      <TableData>
        <Link href={`/users/${user.id}`}>
          <button className={"hover:underline"}>{user.name}</button>
        </Link>
      </TableData>
      <TableData className={"flex items-center space-x-4"}>
        {user.categories.map((o, i) => {
          // only display first 3 categories and percentages
          if (i <= 2) {
            return (
              <div key={i} className={"flex flex-col"}>
                <p className={"text-xs text-slate-500"}>{o.percentage}%</p>
                <p className={"text-sm"}>
                  {categories.find((c) => c.id === o.id)
                    ? categories.find((c) => c.id === o.id).name
                    : "FIXME"}
                </p>
              </div>
            );
          } else {
            return o;
          }
        })}
        {user.categories.length > 3 && (
          <p className={"text-sm text-slate-500"}>
            + {user.categories.length - 3}
          </p>
        )}
      </TableData>
      <TableData>
        {tasks.length - user.task_blacklist.length}{" "}
        <span className={"text-slate-500"}>/</span> {tasks.length}
      </TableData>
      <TableData>
        <span
          className={
            "bg-slate-800 py-1 px-2 text-xs font-medium uppercase tracking-wider"
          }
        >
          {!user.preferences || user.preferences.length === 0 ? (
            <span className={"text-sm text-slate-400"}>None</span>
          ) : (
            <span>{user.preferences.length} Allocated</span>
          )}
        </span>
      </TableData>
      <TableData>
        <div className={"flex items-center justify-end space-x-4"}>
          <Link href={`/users/${user.id}/edit`}>
            <button className={"text-sm hover:underline"}>Edit</button>
          </Link>
          <button
            className={"text-sm hover:underline"}
            onClick={(e) => {
              e.preventDefault();
              handleDuplicate(user);
            }}
          >
            Duplicate
          </button>
          <button
            className={"text-sm hover:underline"}
            onClick={(e) => {
              e.preventDefault();
              handleRemove(user.id);
            }}
          >
            Remove
          </button>
        </div>
      </TableData>
    </tr>
  );
}
