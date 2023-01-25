import Link from "next/link";
import useProjectData from "../../utils/ProjectDataContext";

export default function TasksPage() {
  const [projectData, dispatch, loading] = useProjectData();

  if (loading) {
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
      <div className={"mt-8"}>
        <Link
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
            /* TODO make this prettier */
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
                    name={task.name}
                    description={task.description}
                    category={projectData.categories.find(
                      (c) => c.id === task.category
                    )}
                    weight={task.weight}
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

function TaskRow({ name, description, category, weight }) {
  return (
    <tr>
      <TableData className={"flex flex-col items-start space-y-1"}>
        <button className={"hover:underline"}>{name}</button>
        <p className={"text-sm text-slate-400"}>{description}</p>
      </TableData>
      <TableData>
        {category ? (
          category.name
        ) : (
          <span className={"text-sm text-slate-400"}>None</span>
        )}
      </TableData>
      <TableData>
        <span
          className={
            "bg-slate-800 py-1 px-2 text-xs font-medium uppercase tracking-wider"
          }
        >
          {weight} Points
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
