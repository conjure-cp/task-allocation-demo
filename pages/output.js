import TableHeader from "../components/ui/TableHeader";
import useProjectData from "../utils/ProjectDataContext";
import TableData from "../components/ui/TableData";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  ReferenceLine,
} from "recharts";

export default function OutputPage() {
  const [projectData, dispatch, loading] = useProjectData();

  const chartdata = [
    {
      name: "John Smith",
      "Number of threatened species": 1445,
    },
    {
      name: "John Smith",
      "Number of threatened species": 1450,
    },
    {
      name: "John Smith",
      "Number of threatened species": 1440,
    },
    {
      name: "John Smith",
      "Number of threatened species": 1438,
    },
    {
      name: "John Smith",
      "Number of threatened species": 1452,
    },
    {
      name: "John Smith",
      "Number of threatened species": 1450,
    },
    {
      name: "John Smith",
      "Number of threatened species": 1437,
    },
  ];

  const dataFormatter = (number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };

  if (loading) {
    // TODO
    return null;
  }

  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>Output Allocation</h1>
        <p className={"text-slate-300"}>
          See recommended task allocations below which may be edited.
        </p>
      </div>
      <div className={"mt-8 flex space-x-8"}>
        <div className={"flex w-60 flex-col space-y-4"}>
          <KPI name={"Avg. User Workload"} value={16.8} />
          <KPI name={"Allocation Match"} value={"88%"} />
          <KPI name={"Allocation Match"} value={"88%"} />
        </div>
        <div className={"flex-1 border border-slate-600 bg-slate-800 p-4 pl-5"}>
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <BarChart
              data={chartdata}
              stackOffset={"none"}
              layout={"horizontal"}
            >
              <CartesianGrid
                strokeDasharray={"3 3"}
                horizontal={true}
                vertical={false}
                stroke={"#475569"}
              />
              <XAxis
                dataKey={"name"}
                interval={"preserveStartEnd"}
                tick={{ transform: "translate(0, 6)" }}
                style={{ fontSize: "12px", marginTop: "20px" }}
                stroke={"#cbd5e1"}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                width={48}
                axisLine={false}
                tickLine={false}
                domain={[0, "auto"]}
                type={"number"}
                tick={{ transform: "translate(-3, 0)" }}
                style={{ fontSize: "12px" }}
                stroke={"#cbd5e1"}
                tickFormatter={dataFormatter}
              />
              {["Number of threatened species"].map((cat) => (
                <Bar
                  maxBarSize={56}
                  key={cat}
                  name={cat}
                  type={"linear"}
                  dataKey={cat}
                  fill={"#cbd5e1"}
                  isAnimationActive={true}
                />
              ))}
              <ReferenceLine y={1445} stroke={"#d946ef"} strokeWidth={2} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={"mt-8 text-slate-300"}>
        The following table displays the allocations of tasks and users. This
        allocation calculation can be re-run with certain tasks or users
        &quot;locked&quot; (in which their allocations remain).
      </div>
      <div className={"mt-8 flex justify-end"}>
        <div className={"bg-red-200 p-2"}>switch button</div>
      </div>
      <div className={"mt-4"}>
        <table
          className={
            "w-full divide-y-2 divide-slate-600 border border-slate-600"
          }
        >
          <thead className={"bg-slate-800"}>
            <tr>
              <TableHeader>Task</TableHeader>
              <TableHeader>User</TableHeader>
              <TableHeader />
            </tr>
          </thead>
          <tbody className={"divide-y divide-slate-600"}>
            {projectData.tasks.map((t) => (
              <TaskRow key={t.id} task={t} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TaskRow({ task }) {
  return (
    <tr>
      <TableData>{task.name}</TableData>
      <TableData>TODO</TableData>
    </tr>
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
