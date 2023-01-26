import Link from "next/link";
import useProjectData from "../utils/ProjectDataContext";

export default function Layout({ children }) {
  const [projectData, dispatch, loading] = useProjectData();

  if (loading) {
    // TODO definitely dont want to do this!!!!! but easiest for right now
    // probably should move the nav links (eg with num of tasks) into a separate component that "loads"
    // so that the main layout can load fine on its own
    return null;
  }

  return (
    <div className={"flex h-screen items-stretch"}>
      <div
        className={"w-[19rem] border-r border-slate-700 bg-slate-800 px-8 py-8"}
      >
        <div className={"flex items-center space-x-2"}>
          <Link href={"/"}>
            <h1 className={"text-lg font-semibold hover:underline"}>
              Workload Planner
            </h1>
          </Link>
          <span
            className={"text-xs font-medium tracking-wider text-fuchsia-500"}
          >
            v0.1
          </span>
        </div>
        <div className={"mt-8 flex flex-col items-start space-y-2"}>
          {/* TODO make the numbers in nav prettier */}
          <NavigationLink href={"/tasks"}>
            Tasks ({projectData.tasks ? projectData.tasks.length : 0})
          </NavigationLink>
          <NavigationLink href={"/users"}>
            Users ({projectData.users ? projectData.users.length : 0})
          </NavigationLink>
          <NavigationLink href={"/categories"}>
            Categories (
            {projectData.categories ? projectData.categories.length : 0})
          </NavigationLink>
        </div>
        <div className={"mt-8"}>TODO here display what project is current</div>
      </div>
      <div className={"w-full overflow-auto py-8 px-28"}>{children}</div>
    </div>
  );
}

function NavigationLink({ children, href }) {
  return (
    <Link href={href} className={"hover:underline"}>
      {children}
    </Link>
  );
}
