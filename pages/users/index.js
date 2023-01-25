import Link from "next/link";
import useProjectData from "../../utils/ProjectDataContext";

export default function UsersPage() {
  const [projectData, dispatch, loading] = useProjectData();

  if (loading) {
    // TODO
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
            /* TODO make this prettier */
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

function UserRow({ user, tasks, categories }) {
  return (
    <tr>
      <TableData>
        <button className={"hover:underline"}>{user.name}</button>
      </TableData>
      <TableData className={"flex items-center space-x-4"}>
        {user.categories.map((o, i) => {
          // only display first 3 categories and percentages
          if (i <= 2) {
            return (
              <div key={i} className={"flex flex-col"}>
                <p className={"text-xs text-slate-500"}>{o.percentage}%</p>
                <p className={"text-sm"}>
                  {categories.find((c) => c.id === o.id).name}
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
        {/*<div className={"flex flex-col"}>*/}
        {/*  <p className={"text-xs text-slate-500"}>20%</p>*/}
        {/*  <p className={"text-sm"}>Teaching</p>*/}
        {/*</div>*/}
        {/*<div className={"flex flex-col"}>*/}
        {/*  <p className={"text-xs text-slate-500"}>10%</p>*/}
        {/*  <p className={"text-sm"}>Admin</p>*/}
        {/*</div>*/}
        {/*<div className={"flex flex-col"}>*/}
        {/*  <p className={"text-xs text-slate-500"}>30%</p>*/}
        {/*  <p className={"text-sm"}>Research</p>*/}
        {/*</div>*/}
        {/*<p className={"text-sm text-slate-500"}>+ 2</p>*/}
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
          {!user.task_blacklist || user.task_blacklist.length === 0 ? (
            <span className={"text-sm text-slate-400"}>None</span>
          ) : (
            <span>{user.preferences.length} Allocated</span>
          )}
        </span>
      </TableData>
      <TableData>
        <div className={"flex items-center justify-end space-x-4"}>
          <button className={"text-sm hover:underline"}>Edit</button>
          <button className={"text-sm hover:underline"}>Duplicate</button>
          <button className={"text-sm hover:underline"}>Remove</button>
        </div>
      </TableData>
    </tr>
  );
}

function TableHeader({ children }) {
  return (
    <th
      className={
        "py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400"
      }
    >
      {children}
    </th>
  );
}

function TableData({ children, className }) {
  return <td className={`py-4 px-4 ${className}`}>{children}</td>;
}
