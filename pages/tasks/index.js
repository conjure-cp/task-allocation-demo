import Link from "next/link";
import useProjectData from "../../utils/ProjectDataContext";
import TableData from "../../components/ui/TableData";
import TableHeader from "../../components/ui/TableHeader";
import Tag from "../../components/ui/Tag";

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
                    id={task.id}
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

function TaskRow({ id, name, description, category, weight }) {
  return (
    <tr>
      <TableData className={"flex flex-col items-start space-y-1"}>
        <Link href={`/tasks/${id}`}>
          <button className={"hover:underline"}>{name}</button>
        </Link>
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
        <Tag>{weight} Points</Tag>
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
