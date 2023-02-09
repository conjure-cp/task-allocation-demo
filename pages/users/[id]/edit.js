import { UserEditor } from "../../../components/users/UserCreateEdit";
import { useRouter } from "next/router";
import useProjectData from "../../../utils/ProjectDataContext";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = router.query;

  const [projectData, dispatch, loading] = useProjectData();

  const user = projectData.users.find((u) => u.id === parseInt(id));

  const handleEditUser = (name, disallowedTasks, tasks, categories) => {
    dispatch({
      type: "EDIT_USER",
      userId: parseInt(id),
      name: name,
      categories: categories,
      task_blacklist: disallowedTasks.map((x) => parseInt(x)),
      preferences: tasks.map((x) => parseInt(x)),
    });

    router.push(`/users/${id}`);
  };

  if (loading || !user) {
    // TODO
    return null;
  }

  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>Edit User</h1>
        <p className={"text-slate-300"}>
          Some description about how users data is used or whatever.
        </p>
      </div>
      <UserEditor onSubmit={handleEditUser} user={user} />
    </div>
  );
}
