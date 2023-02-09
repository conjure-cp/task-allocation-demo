import Input from "../ui/Input";
import PrimaryButton from "../ui/PrimaryButton";
import { useState } from "react";

export function CategoryCreator({ onSubmit }) {
  return (
    <CategoryForm
      initialName={""}
      handleSubmit={onSubmit}
      buttonText={"Create Category"}
    />
  );
}

export function CategoryEditor({ category, onSubmit }) {
  return (
    <CategoryForm
      initialName={category.name}
      handleSubmit={onSubmit}
      buttonText={"Save Category"}
    />
  );
}

function CategoryForm({ initialName, handleSubmit, buttonText }) {
  const [name, setName] = useState(initialName);

  return (
    <form
      className={"mt-8 space-y-8"}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(name);
      }}
    >
      <Input
        label={"Name"}
        placeholder={"Teaching"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <PrimaryButton>{buttonText}</PrimaryButton>
    </form>
  );
}
