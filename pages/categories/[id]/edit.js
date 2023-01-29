import { useRouter } from "next/router";
import useProjectData from "../../../utils/ProjectDataContext";
import { CategoryEditor } from "../../../components/tasks/CategoryCreateEdit";

export default function EditCategoryPage() {
  const router = useRouter();
  const { id } = router.query;

  const [projectData, dispatch, loading] = useProjectData();

  const category = projectData.categories.find((c) => c.id === parseInt(id));

  const handleSubmit = (name) => {
    dispatch({
      type: "EDIT_CATEGORY",
      categoryId: parseInt(category.id),
      name: name,
    });

    router.push("/categories");
  };

  if (loading || !category) {
    // TODO
    return null;
  }

  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>Edit Category</h1>
        <p className={"text-slate-300"}>
          Some description about how categories data is used or whatever.
        </p>
      </div>
      <CategoryEditor category={category} onSubmit={handleSubmit} />
    </div>
  );
}
