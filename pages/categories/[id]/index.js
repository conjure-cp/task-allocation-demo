import { useRouter } from "next/router";
import useProjectData from "../../../utils/ProjectDataContext";
import Link from "next/link";
import SecondaryButton from "../../../components/ui/SecondaryButton";
import TableHeader from "../../../components/ui/TableHeader";
import TableData from "../../../components/ui/TableData";

export default function CategoryViewPage() {
  const router = useRouter();
  const { id } = router.query;

  const [projectData, dispatch, loading] = useProjectData();

  const category = projectData.categories.find((c) => c.id === parseInt(id));

  if (loading || !category) {
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
            Category
          </p>
          <h1 className={"text-2xl font-semibold"}>{category.name}</h1>
        </div>
        <div className={"flex items-center space-x-4"}>
          <Link href={`/categories/${id}/edit`}>
            <SecondaryButton>Edit</SecondaryButton>
          </Link>
          <SecondaryButton
            onClick={(e) => {
              e.preventDefault();
              router.push("/categories").then(() => {
                dispatch({
                  type: "DUPLICATE_CATEGORY",
                  category: category,
                });
              });
            }}
          >
            Duplicate
          </SecondaryButton>
          <SecondaryButton
            onClick={(e) => {
              e.preventDefault();
              router.push("/categories").then(() => {
                dispatch({
                  type: "REMOVE_CATEGORY",
                  categoryId: category.id,
                });
              });
            }}
          >
            Remove
          </SecondaryButton>
        </div>
      </div>
      <div className={"mt-8"}>
        <table
          className={
            "w-1/2 divide-y-2 divide-slate-600 border border-slate-600"
          }
        >
          <thead className={"bg-slate-800"}>
            <tr>
              <TableHeader>Task</TableHeader>
            </tr>
          </thead>
          <tbody className={"divide-y divide-slate-600"}>
            {projectData.tasks
              .filter((t) => t.category === category.id)
              .map((t) => (
                <TaskRow key={t.id} task={t} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TaskRow({ task }) {
  return (
    <tr>
      <TableData className={"flex flex-col items-start space-y-1"}>
        <Link href={`/tasks/${task.id}`}>
          <button className={"hover:underline"}>{task.name}</button>
        </Link>
        <p className={"text-sm text-slate-400"}>{task.description}</p>
      </TableData>
    </tr>
  );
}
