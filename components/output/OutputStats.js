import AverageBarChart from "../ui/AverageBarChart";
import KPI from "../ui/KPI";

export default function OutputStats({ projectData, solution }) {
  const getChartData = () => {
    return projectData.output_history
      .find((oh) => oh.output_id === projectData.current_selected_output_id)
      .state.users.map((u) => ({
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

  const getCoeffVariation = () => {
    const mean = getAverageWorkload();
    const data = getChartData();
    const variation =
      data.reduce((total, o) => total + Math.pow(o.Weight - mean, 2), 0) /
      data.length;
    return (Math.sqrt(variation) / mean) * 100;
  };

  const getTotalWorkload = () => {
    return getChartData().reduce((total, o) => total + o.Weight, 0);
  };

  return (
    <div className={"flex space-x-4"}>
      <div className={"flex w-60 flex-col space-y-4"}>
        <KPI
          name={"Avg. User Workload"}
          value={getAverageWorkload().toFixed(1)}
        />
        <KPI
          name={"Coefficient of Variation"}
          value={getCoeffVariation().toFixed(1) + "%"}
        />
        <KPI name={"Total Workload"} value={getTotalWorkload()} />
      </div>
      <div className={"flex-1 border border-slate-600 bg-slate-800 p-4 pl-5"}>
        <AverageBarChart data={getChartData()} average={getAverageWorkload()} />
      </div>
    </div>
  );
}
