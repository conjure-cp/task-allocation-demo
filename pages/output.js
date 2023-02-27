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
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "../components/ui/PrimaryButton";
import axios from "axios";
import {
  convertInput,
  ESSENCE_MODEL,
  GET_URL,
  SUBMIT_URL,
} from "../utils/model";
import { Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import SecondaryButton from "../components/ui/SecondaryButton";

export default function OutputPage() {
  const router = useRouter();
  const [projectData, dispatch, loading] = useProjectData();

  const calledWait = useRef(false);

  const [isTaskView, setTaskView] = useState(true);
  const [lockedTasks, setLockedTasks] = useState([]);

  useEffect(() => {
    const wait = async () => {
      let timer = setInterval(async () => {
        const res = await axios.post(
          GET_URL,
          { jobid: projectData.output_state.job_id },
          { headers: { "Content-Type": "application/json" } }
        );

        if (res.data && res.data.status && res.data.status !== "wait") {
          clearInterval(timer);

          dispatch({
            type: "ADD_OUTPUT",
            output: res.data,
          });
        }
      }, 3000);
    };

    if (
      !loading &&
      projectData.output_state &&
      projectData.output_state.status &&
      projectData.output_state.status === "wait" &&
      !calledWait.current
    ) {
      calledWait.current = true;
      wait();
    }
  }, [loading]);

  const handleGenerate = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      SUBMIT_URL,
      {
        solver: "cadical",
        model: ESSENCE_MODEL,
        data: JSON.stringify(convertInput(projectData)),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "WAIT_OUTPUT",
      job_id: parseInt(res.data.jobid),
    });

    router.reload();
  };

  if (loading) {
    // TODO
    return null;
  }

  // waiting state
  if (
    projectData.output_state &&
    projectData.output_state.status &&
    projectData.output_state.status === "wait"
  ) {
    return (
      <PageLayout>
        <div className={"flex justify-center"}>
          <div className={"flex flex-col items-center"}>
            {/* path from https://github.com/n3r4zzurr0/svg-spinners */}
            <svg
              className={"h-10 w-10 animate-spin fill-white text-white"}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
            </svg>
            <p className={"text-medium mt-2"}>Generating output...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  // empty state
  if (!projectData.output_history) {
    return (
      <PageLayout>
        <div className={"flex justify-center"}>
          <div className={"flex flex-col items-center"}>
            <ChartBarSquareIcon className={"h-12 w-12 text-slate-500"} />
            <p className={"text-medium mt-2"}>No output allocation</p>
            <p className={"text-sm text-slate-400"}>
              Get started by generating the first output allocation from your
              input.
            </p>
            <PrimaryButton className={"mt-6"} onClick={handleGenerate}>
              Generate Output
            </PrimaryButton>
          </div>
        </div>
      </PageLayout>
    );
  }

  const solution = projectData.output_history.at(-1);

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
    <PageLayout>
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
          <AverageChart data={getChartData()} average={getAverageWorkload()} />
        </div>
      </div>
      <div className={"mt-8 text-slate-300"}>
        The following table displays the allocations of tasks and users. This
        allocation calculation can be re-run with certain tasks or users
        &quot;locked&quot; (in which their allocations remain).
      </div>
      <div className={"mt-8 flex justify-end"}>
        <ViewToggle isTaskView={isTaskView} setTaskView={setTaskView} />
      </div>
      <div className={"mt-4"}>
        {isTaskView ? (
          <TasksTable
            tasks={projectData.tasks}
            users={projectData.users}
            solution={solution}
            lockedTasks={lockedTasks}
            setLockedTasks={setLockedTasks}
          />
        ) : (
          <UsersTable
            users={projectData.users}
            tasks={projectData.tasks}
            solution={solution}
            lockedTasks={lockedTasks}
            setLockedTasks={setLockedTasks}
          />
        )}
      </div>
    </PageLayout>
  );
}

function AverageChart({ data, average }) {
  const dataFormatter = (number) => {
    return Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarChart data={data} stackOffset={"none"} layout={"horizontal"}>
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
        {["Weight"].map((cat) => (
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
        <ReferenceLine y={average} stroke={"#d946ef"} strokeWidth={2} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function PageLayout({ children }) {
  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>Output Allocation</h1>
        <p className={"text-slate-300"}>
          See recommended task allocations below which may be edited.
        </p>
      </div>
      <div className={"mt-8"}>{children}</div>
    </div>
  );
}

function UsersTable({ users, tasks, solution, lockedTasks, setLockedTasks }) {
  return (
    <table
      className={"w-full divide-y-2 divide-slate-600 border border-slate-600"}
    >
      <thead className={"bg-slate-800"}>
        <tr>
          <TableHeader>User</TableHeader>
          <TableHeader>Task</TableHeader>
          <TableHeader />
        </tr>
      </thead>
      <tbody className={"divide-y divide-slate-600"}>
        {users.map((u) => (
          <Fragment key={u.id}>
            <tr className={"border-b-2 border-slate-600"}>
              <th
                colSpan={3}
                className={"bg-slate-700 p-4 text-left font-normal text-white"}
              >
                <div className={"flex items-center justify-between"}>
                  <span>{u.name}</span>
                  <LockAllButton
                    onClick={() =>
                      setLockedTasks((old) => {
                        const ret = [...old];
                        Object.keys(solution.assignment)
                          .filter((t) => solution.assignment[t] === u.id + 1)
                          .forEach((t) => {
                            if (!old.includes(parseInt(t) - 1)) {
                              ret.push(parseInt(t) - 1);
                            }
                          });
                        return ret;
                      })
                    }
                  />
                </div>
              </th>
            </tr>
            {tasks
              .filter((t) => solution.assignment[t.id + 1] === u.id + 1)
              .map((t) => (
                <UserRow
                  key={t.id}
                  task={t}
                  isLocked={lockedTasks.includes(t.id)}
                  setLocked={(locked) =>
                    handleSetLocked(setLockedTasks, locked, t)
                  }
                />
              ))}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}

function handleSetLocked(setLockedTasks, locked, task) {
  if (locked) {
    setLockedTasks((oldLocked) => [...oldLocked, task.id]);
  } else {
    setLockedTasks((oldLocked) => oldLocked.filter((x) => x !== task.id));
  }
}

function UserRow({ task, isLocked, setLocked }) {
  return (
    <tr>
      <TableData></TableData>
      <TableData>{task.name}</TableData>
      <TableData className={"flex justify-end"}>
        <LockTaskButton isLocked={isLocked} setLocked={setLocked} />
      </TableData>
    </tr>
  );
}

function TasksTable({ tasks, users, solution, lockedTasks, setLockedTasks }) {
  return (
    <table
      className={"w-full divide-y-2 divide-slate-600 border border-slate-600"}
    >
      <thead className={"bg-slate-800"}>
        <tr>
          <TableHeader>Task</TableHeader>
          <TableHeader>User</TableHeader>
          <TableHeader />
        </tr>
      </thead>
      <tbody className={"divide-y divide-slate-600"}>
        {tasks.map((t) => (
          <TaskRow
            key={t.id}
            task={t}
            user={users.find((u) => u.id === solution.assignment[t.id + 1] - 1)}
            isLocked={lockedTasks.includes(t.id)}
            setLocked={(locked) => handleSetLocked(setLockedTasks, locked, t)}
          />
        ))}
      </tbody>
    </table>
  );
}

function TaskRow({ task, isLocked, setLocked, user }) {
  return (
    <tr>
      <TableData>{task.name}</TableData>
      <TableData>{user.name}</TableData>
      <TableData className={"flex justify-end"}>
        <LockTaskButton isLocked={isLocked} setLocked={setLocked} />
      </TableData>
    </tr>
  );
}

function LockTaskButton({ isLocked, setLocked }) {
  return (
    <SecondaryButton onClick={() => setLocked(!isLocked)}>
      {isLocked ? "Unlock" : "Lock"}
    </SecondaryButton>
  );
}

function LockAllButton({ onClick }) {
  return <SecondaryButton onClick={onClick}>Lock All</SecondaryButton>;
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

function ViewToggle({ isTaskView, setTaskView }) {
  const activeClasses = "bg-slate-700 text-white";
  const inactiveClasses = "text-slate-400 hover:text-slate-200";

  return (
    <div
      className={
        "flex items-center border border-slate-600 bg-slate-800 text-sm"
      }
    >
      <button
        className={`px-2 py-1 ${isTaskView ? activeClasses : inactiveClasses}`}
        onClick={() => setTaskView(true)}
      >
        Task View
      </button>
      <button
        className={`px-2 py-1 ${!isTaskView ? activeClasses : inactiveClasses}`}
        onClick={() => setTaskView(false)}
      >
        User View
      </button>
    </div>
  );
}
