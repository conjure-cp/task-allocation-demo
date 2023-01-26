import useProjectData from "../../utils/ProjectDataContext";
import Input from "../../components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/router";
import PrimaryButton from "../../components/ui/PrimaryButton";

export default function NewCategoryPage() {
  const [projectData, dispatch, loading] = useProjectData();
  const router = useRouter();

  const [name, setName] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

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
      <form className={"mt-8 space-y-8"} onSubmit={handleSubmit}>
        <Input
          label={"Name"}
          placeholder={"Teaching"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <PrimaryButton>Create Category</PrimaryButton>
      </form>
    </div>
  );
}
