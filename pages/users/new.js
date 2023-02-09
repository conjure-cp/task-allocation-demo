import { useRouter } from "next/router";
import { UserCreator } from "../../components/users/UserCreateEdit";

export default function NewUserPage() {
  const router = useRouter();

  const handleCreateUser = (name, disallowedTasks, tasks, categories) => {
    dispatch({
      type: "ADD_USER",
      name: name,
      task_blacklist: disallowedTasks.map((x) => parseInt(x)),
      preferences: tasks.map((x) => parseInt(x)),
      categories: categories,
    });

    router.push("/users");
  };

  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>New User</h1>
        <p className={"text-slate-300"}>
          Some description about how users data is used or whatever.
        </p>
      </div>
      <UserCreator onSubmit={handleCreateUser} />
    </div>
  );
}
