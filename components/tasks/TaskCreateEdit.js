import Input from "../ui/Input";
import Select from "../ui/Select";
import { useState } from "react";

export function TaskCreator({ projectData, onSubmit }) {
  return (
    <TaskForm
      projectData={projectData}
      handleSubmit={onSubmit}
      initialName={""}
      initialDescription={""}
      initialCategory={-1}
      initialWeight={""}
      buttonText={"Create Task"}
    />
  );
}

export function TaskEditor({ projectData, task, onSubmit }) {
  return (
    <TaskForm
      projectData={projectData}
      handleSubmit={onSubmit}
      initialName={task.name}
      initialDescription={task.description}
      initialCategory={task.category}
      initialWeight={task.weight}
      buttonText={"Save Task"}
    />
  );
}

function TaskForm({
  projectData,
  handleSubmit,
  initialName,
  initialDescription,
  initialCategory,
  initialWeight,
  buttonText,
}) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [category, setCategory] = useState(initialCategory);
  const [weight, setWeight] = useState(initialWeight);

  return (
    <form
      className={"mt-8 space-y-8"}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(name, description, parseInt(category), parseInt(weight));
      }}
    >
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
      <button 
        id={"createTaskButton"}
        className={"border py-2 px-2 hover:underline"}
      >
        {buttonText}
      </button>
    </form>
  );
}
