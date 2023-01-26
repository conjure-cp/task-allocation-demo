import useProjectData from "../../utils/ProjectDataContext";
import Link from "next/link";
import TableHeader from "../../components/ui/TableHeader";
import TableData from "../../components/ui/TableData";

export default function CategoriesPage() {
  const [projectData, dispatch, loading] = useProjectData();

  if (loading) {
    // TODO
    return null;
  }

  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>Categories Data</h1>
        <p className={"text-slate-300"}>
          Some description about how categories data is used or whatever.
        </p>
      </div>
      <div className={"mt-8"}>
        <Link
          href={"/categories/new"}
          className={"border py-2 px-2 hover:underline"}
        >
          New Category
        </Link>
        <div className={"mt-4"}>
          {!projectData.categories || projectData.categories.length === 0 ? (
            <p className={"text-sm text-slate-300"}>
              There are currently no categories in your project.
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
                  <TableHeader>Category</TableHeader>
                  <TableHeader>Tasks</TableHeader>
                  <TableHeader />
                </tr>
              </thead>
              <tbody className={"divide-y divide-slate-600"}>
                {projectData.categories.map((cat) => (
                  <CategoryRow
                    key={cat.id}
                    category={cat}
                    tasks={projectData.tasks}
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

function CategoryRow({ category, tasks }) {
  const numTasks = tasks.filter((t) => t.category === category.id).length;

  return (
    <tr>
      <TableData className={"flex flex-col items-start space-y-1"}>
        <p>{category.name}</p>
      </TableData>
      <TableData>
        {numTasks !== 0 ? (
          <span
            className={
              "bg-slate-800 py-1 px-2 text-xs font-medium uppercase tracking-wider"
            }
          >
            {numTasks}
          </span>
        ) : (
          <span className={"text-sm text-slate-400"}>None</span>
        )}
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
