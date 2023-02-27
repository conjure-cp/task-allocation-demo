import Link from "next/link";
import useProjectData from "../utils/ProjectDataContext";
import { useRouter } from "next/router";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";

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
        <div className={"mt-8 flex flex-col items-start space-y-4"}>
          <NavigationLink href={"/"}>Project</NavigationLink>
          <NavigationLink
            href={"/tasks"}
            badge={projectData.tasks ? projectData.tasks.length : 0}
          >
            Tasks
          </NavigationLink>
          <NavigationLink
            href={"/users"}
            badge={projectData.users ? projectData.users.length : 0}
          >
            Users
          </NavigationLink>
          <NavigationLink
            href={"/categories"}
            badge={projectData.categories ? projectData.categories.length : 0}
          >
            Categories
          </NavigationLink>
        </div>
        <div className={"mt-8 border-t border-slate-700 pt-8"}>
          <Link href={"/output"}>
            <button
              className={
                "px-2 group flex w-full items-center justify-between space-x-2"
              }
            >
            <span className={"text-slate-400 group-hover:text-slate-200"}>
              View Output
            </span>
              <ArrowSmallRightIcon
                className={"h-6 w-6 text-slate-500 group-hover:text-slate-300"}
              />
            </button>
          </Link>
        </div>
      </div>
      <div className={"w-full overflow-auto py-8 px-28"}>{children}</div>
    </div>
  );
}

function NavigationLink({ children, badge, href }) {
  const router = useRouter();

  const active = router.pathname.includes(href);

  return (
    <button
      className={`flex w-full items-center justify-between px-3 py-2 ${
        active ? "bg-slate-900" : "hover:bg-slate-700"
      }`}
      onClick={(e) => {
        e.preventDefault();
        router.push(href);
      }}
    >
      <span className={`${active ? "text-slate-100" : "text-slate-400"}`}>
        {children}
      </span>
      {badge ? (
        <code
          className={`${
            active ? "text-slate-400" : "bg-slate-700 text-slate-400"
          } px-1 text-sm font-medium`}
        >
          {badge}
        </code>
      ) : null}
    </button>
  );
}
