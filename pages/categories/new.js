import useProjectData from "../../utils/ProjectDataContext";
import { useRouter } from "next/router";
import { CategoryCreator } from "../../components/categories/CategoryCreateEdit";

export default function NewCategoryPage() {
  const [projectData, dispatch, loading] = useProjectData();
  const router = useRouter();

  const handleSubmit = (name) => {
    dispatch({
      type: "ADD_CATEGORY",
      name: name,
    });

    router.push("/categories");
  };

  if (loading) {
    // TODO
    return null;
  }

  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>New Category</h1>
        <p className={"text-slate-300"}>
          Some description about how categories data is used or whatever.
        </p>
      </div>
      <CategoryCreator onSubmit={handleSubmit} />
    </div>
  );
}
