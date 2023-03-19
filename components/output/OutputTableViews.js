import TableHeader from "../ui/TableHeader";
import TableData from "../ui/TableData";
import SecondaryButton from "../ui/SecondaryButton";
import useProjectData from "../../utils/ProjectDataContext";
import { Fragment, useState } from "react";
import Tag from "../ui/Tag";

export default function OutputTableViews({ solution, oldSolutionState }) {
  const [projectData, dispatch, loading] = useProjectData();

  const [isTaskView, setTaskView] = useState(true);

  if (loading) {
    return null;
  }

  const lockedTasks = projectData.locked_tasks ? projectData.locked_tasks : [];

  const setLockedTasks = (lockedTasksFunc) => {
    dispatch({
      type: "SET_LOCKED_TASKS",
      tasks: lockedTasksFunc([...lockedTasks]),
    });
  };

  return (
    <>
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
            oldSolutionState={oldSolutionState}
            lockedTasks={lockedTasks}
            setLockedTasks={setLockedTasks}
          />
        ) : (
          <UsersTable
            users={projectData.users}
            tasks={projectData.tasks}
            solution={solution}
            oldSolutionState={oldSolutionState}
            lockedTasks={lockedTasks}
            setLockedTasks={setLockedTasks}
          />
        )}
      </div>
    </>
  );
}

function UsersTable({
  users,
  tasks,
  solution,
  oldSolutionState,
  lockedTasks,
  setLockedTasks,
}) {
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
        {[...new Set(Object.values(solution.assignment))].map((ua) => {
          const rid = parseInt(ua) - 1;

          const curUser = users.find((u) => u.id === rid);
          const oldUser = oldSolutionState.users.find((u) => u.id === rid);

          if (!curUser) {
            return (
              <UserHeader
                key={`old${oldUser.id}`}
                user={oldUser}
                tasks={tasks}
                solution={solution}
                oldSolutionState={oldSolutionState}
                deleted={true}
                edited={false}
                setLocked={setLockedTasks}
                lockedTasks={lockedTasks}
              />
            );
          }

          return (
            <UserHeader
              key={curUser.id}
              user={curUser}
              tasks={tasks}
              solution={solution}
              oldSolutionState={oldSolutionState}
              deleted={false}
              edited={JSON.stringify(curUser) !== JSON.stringify(oldUser)}
              setLocked={setLockedTasks}
              lockedTasks={lockedTasks}
            />
          );
        })}
      </tbody>
    </table>
  );
}

function UserHeader({
  user,
  tasks,
  solution,
  oldSolutionState,
  deleted,
  edited,
  setLocked,
  lockedTasks,
}) {
  return (
    <Fragment key={user.id}>
      <tr className={"border-b-2 border-slate-600"}>
        <th
          colSpan={3}
          className={"bg-slate-700 p-4 text-left font-normal text-white"}
        >
          <div className={"flex items-center justify-between"}>
            <div className={"flex items-center space-x-2"}>
              <span className={deleted ? "opacity-25" : ""}>{user.name}</span>
              {deleted ? <Tag className={"text-slate-400"}>Removed</Tag> : null}
              {!deleted && edited ? (
                <Tag className={"text-slate-400"}>Edited</Tag>
              ) : null}
            </div>
            {!deleted ? (
              <LockAllButton
                onClick={() =>
                  setLocked((old) => {
                    const ret = [...old];
                    Object.keys(solution.assignment)
                      .filter((t) => solution.assignment[t] === user.id + 1)
                      .forEach((t) => {
                        if (!old.includes(parseInt(t) - 1)) {
                          ret.push(parseInt(t) - 1);
                        }
                      });
                    return ret;
                  })
                }
              />
            ) : null}
          </div>
        </th>
      </tr>
      {Object.keys(solution.assignment).map((ta) => {
        const rid = parseInt(ta) - 1;

        const curTask = tasks.find((x) => x.id === rid);
        const oldTask = oldSolutionState.tasks.find((x) => x.id === rid);

        return (
          <UserRow
            key={curTask ? curTask.id : "old" + oldTask.id}
            task={curTask ? curTask : oldTask}
            userDeleted={deleted}
            deleted={!curTask}
            isLocked={curTask && lockedTasks.includes(curTask.id)}
            setLocked={setLocked}
            edited={
              curTask && JSON.stringify(curTask) !== JSON.stringify(oldTask)
            }
          />
        );
      })}
    </Fragment>
  );
}

function UserRow({ task, isLocked, setLocked, userDeleted, deleted, edited }) {
  return (
    <tr>
      <TableData></TableData>
      <TaskDisplay
        task={task}
        className={userDeleted ? "opacity-25" : null}
        taskDeleted={deleted}
        edited={edited}
      />
      {!deleted ? (
        <TableData>
          <div className={"flex justify-end"}>
            <LockTaskButton
              isLocked={isLocked}
              setLocked={(locked) => handleSetLocked(setLocked, locked, task)}
            />
          </div>
        </TableData>
      ) : null}
    </tr>
  );
}

function TasksTable({
  tasks,
  users,
  solution,
  oldSolutionState,
  lockedTasks,
  setLockedTasks,
}) {
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
        {Object.keys(solution.assignment).map((ta) => {
          // - task in solution but now is deleted
          // - task in solution but now user deleted
          // - should have an "edited" flag

          const rid = parseInt(ta) - 1;

          const curTask = tasks.find((t) => t.id === rid);
          const curUser = users.find(
            (u) => u.id === solution.assignment[ta] - 1
          );

          const oldTask = oldSolutionState.tasks.find((t) => t.id === rid);
          const oldUser = oldSolutionState.users.find(
            (u) => u.id === solution.assignment[ta] - 1
          );

          if (!curTask || !curUser) {
            // task in solution but now either task or user deleted, so use old state to display that it's deleted
            return (
              <TaskRow
                key={`old${rid}`}
                task={oldTask}
                taskDeleted
                user={oldUser}
                isLocked={lockedTasks.includes(rid)}
                setLocked={(locked) =>
                  handleSetLocked(setLockedTasks, locked, curTask)
                }
              />
            );
          }

          return (
            <TaskRow
              key={rid}
              task={curTask}
              user={curUser}
              edited={JSON.stringify(curTask) !== JSON.stringify(oldTask)}
              isLocked={lockedTasks.includes(rid)}
              setLocked={(locked) =>
                handleSetLocked(setLockedTasks, locked, curTask)
              }
            />
          );
        })}
      </tbody>
    </table>
  );
}

function TaskDisplay({ task, taskDeleted, edited, className }) {
  return (
    <TableData className={className}>
      <div className={"flex flex-col items-start space-y-1"}>
        <div className={"flex items-center space-x-2"}>
          <span className={`${taskDeleted ? "opacity-25" : null}`}>
            {task.name}
          </span>
          {edited && !taskDeleted ? (
            <Tag className={"text-slate-400"}>Edited</Tag>
          ) : null}
          {taskDeleted ? <Tag className={"text-slate-400"}>Removed</Tag> : null}
        </div>
        <p
          className={`text-sm text-slate-400 ${
            taskDeleted ? "opacity-25" : null
          }`}
        >
          {task.description}
        </p>
      </div>
    </TableData>
  );
}

function TaskRow({ task, isLocked, setLocked, user, taskDeleted, edited }) {
  return (
    <tr>
      <TaskDisplay task={task} taskDeleted={taskDeleted} edited={edited} />
      <TableData className={`${taskDeleted ? "opacity-25" : null}`}>
        {user.name}
      </TableData>
      {!taskDeleted ? (
        <TableData>
          <div className={"flex justify-end"}>
            <LockTaskButton isLocked={isLocked} setLocked={setLocked} />
          </div>
        </TableData>
      ) : null}
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

function handleSetLocked(setLockedTasks, locked, task) {
  if (locked) {
    setLockedTasks((oldLocked) => [...oldLocked, task.id]);
  } else {
    setLockedTasks((oldLocked) => oldLocked.filter((x) => x !== task.id));
  }
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
