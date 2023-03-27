import Link from "next/link";
import useProjectData from "../../utils/ProjectDataContext";
import { useRouter } from "next/router";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import OutputVersionDropdown from "./OutputVersionDropdown";
import UnsavedChangesMenu from "../output/UnsavedChangesMenu";
import Head from "next/head";

export default function Layout({ children }) {
  const [projectData, dispatch, loading] = useProjectData();

  if (loading) {
    return null;
  }

  return (
    <div className={"flex h-screen items-stretch"}>
      <Head>
        <title>Workload Planner</title>
      </Head>
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
          <NavigationLink href={"/"} equals>
            Project
          </NavigationLink>
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
        {Object.hasOwn(projectData, "id") && projectData.id !== -1 ? (
          <div>
            <div
              className={
                "mt-8 flex flex-col space-y-1 border-t border-slate-700 px-2 pt-8"
              }
            >
              <SidebarLabel>Project Name:</SidebarLabel>
              <span className={"text-sm"}>{projectData.name}</span>
            </div>
            <div className={"mt-4 px-2"}>
              <SidebarLabel>Solution Version:</SidebarLabel>
              <OutputVersionDropdown />
            </div>
            <div className={"mt-8"}>
              <Link href={"/output"}>
                <button
                  className={
                    "group flex w-full items-center justify-between space-x-2 px-2"
                  }
                >
                  <span className={"text-slate-400 group-hover:text-slate-200"}>
                    Solution Details
                  </span>
                  <ArrowSmallRightIcon
                    className={
                      "h-6 w-6 text-slate-500 group-hover:text-slate-300"
                    }
                  />
                </button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
      <div className={"w-full overflow-auto py-8 px-28"}>
        <UnsavedChangesMenu />
        {children}
      </div>
    </div>
  );
}

function NavigationLink({ children, badge, href, equals = false }) {
  const router = useRouter();

  const active = equals
    ? router.pathname === href
    : router.pathname.includes(href);

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

function SidebarLabel({ children }) {
  return (
    <span className={"text-xs tracking-wide text-slate-400"}>{children}</span>
  );
}
