import useProjectData from "../../utils/ProjectDataContext";
import { useState } from "react";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

export default function NewTaskPage() {
  const [projectData, dispatch, loading] = useProjectData();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(-1);
  const [weight, setWeight] = useState(undefined);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_TASK",
      name: name,
      description: description,
      category: category,
      weight: weight,
    });
  };

  // TODO error handling, eg missing fields arent allowed

  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>New Task</h1>
        <p className={"text-slate-300"}>
          Some description about how tasks data is used or whatever.
        </p>
      </div>
      <form className={"mt-8 space-y-8"} onSubmit={handleSubmit}>
        <Input
          label={"Name"}
          placeholder={"Director of Studies"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label={"Description"}
          placeholder={"Oversee all academics within the school."}
          width={"w-[600px]"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select
          label={"Category"}
          placeholder={"Select..."}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {projectData.categories &&
            projectData.categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </Select>
        <Input
          label={"Weight"}
          placeholder={"1+"}
          type={"number"}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button className={"border py-2 px-2 hover:underline"}>
          Create Task
        </button>
      </form>
    </div>
  );
}
