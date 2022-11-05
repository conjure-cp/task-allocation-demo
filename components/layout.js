import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className={"flex items-stretch h-screen"}>
      <div className={"w-[19rem] bg-slate-800 border-slate-700 border-r px-8 py-8"}>
        <div className={"flex items-center space-x-2"}>
          <h1 className={"text-lg font-semibold"}>Workload Planner</h1>
          <span className={"text-xs tracking-wider font-medium text-fuchsia-500"}>v0.1</span>
        </div>
        <div className={"mt-8 flex flex-col items-start space-y-2"}>
          <NavigationLink href={"#"}>Tasks (?)</NavigationLink>
          <NavigationLink href={"#"}>Users (?)</NavigationLink>
        </div>
      </div>
      <div className={"py-8 px-28 w-full"}>{children}</div>
    </div>
  );
}

function NavigationLink({ children, href }) {
  return (
    <Link href={href} className={"hover:underline"}>{children}</Link>
  );
}
