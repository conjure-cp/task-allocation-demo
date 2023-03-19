import AverageBarChart from "../ui/AverageBarChart";

export default function OutputStats({ projectData, solution }) {
  const getChartData = () => {
    return projectData.users.map((u) => ({
      name: u.name,
      Weight: projectData.tasks
        .filter((t) => solution.assignment[t.id + 1] === u.id + 1)
        .reduce((total, t) => total + t.weight, 0),
    }));
  };

  const getAverageWorkload = () => {
    const data = getChartData();
    return data.reduce((total, o) => total + o.Weight, 0) / data.length;
  };

  return (
    <div className={"flex space-x-4"}>
      <div className={"flex w-60 flex-col space-y-4"}>
        <KPI
          name={"Avg. User Workload"}
          value={getAverageWorkload().toFixed(1)}
        />
        <KPI name={"Allocation Match"} value={"TODO"} />
        <KPI name={"Allocation Match"} value={"TODO"} />
      </div>
      <div className={"flex-1 border border-slate-600 bg-slate-800 p-4 pl-5"}>
        <AverageBarChart data={getChartData()} average={getAverageWorkload()} />
      </div>
    </div>
  );
}

function KPI({ name, value }) {
  return (
    <div className={"space-y-2 border border-slate-600 bg-slate-800 p-4"}>
      <p
        className={
          "text-xs font-semibold uppercase tracking-wider text-slate-400"
        }
      >
        {name}
      </p>
      <p className={"text-3xl font-semibold"}>{value}</p>
    </div>
  );
}
