export default function TasksPage() {
  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>Tasks Data</h1>
        <p className={"text-slate-300"}>
          Some description about how tasks data is used or whatever.
        </p>
      </div>
      <div className={"mt-8"}>
        <button className={"border py-1 px-2 hover:underline"}>Add Task</button>
        <table
          className={
            "mt-4 w-full divide-y-2 divide-slate-600 border border-slate-600"
          }
        >
          <thead className={"bg-slate-800"}>
            <tr>
              <TableHeader>Task</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Weight</TableHeader>
              <TableHeader />
            </tr>
          </thead>
          <tbody className={"divide-y divide-slate-600"}>
            <TaskRow />
            <TaskRow />
            <TaskRow />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TaskRow() {
  return (
    <tr>
      <TableData className={"flex flex-col items-start space-y-1"}>
        <button className={"hover:underline"}>Teach CS3102</button>
        <p className={"text-sm text-slate-400"}>
          This module is something and yea...
        </p>
      </TableData>
      <TableData>Teaching</TableData>
      <TableData className={""}>
        <span
          className={
            "bg-slate-800 py-1 px-2 text-xs font-medium uppercase tracking-wider"
          }
        >
          26 Points
        </span>
      </TableData>
      <TableData>
        <div className={"flex items-center justify-end space-x-4"}>
          <button className={"text-sm hover:underline"}>Edit</button>
          <button className={"text-sm hover:underline"}>Duplicate</button>
          <button className={"text-sm hover:underline"}>Remove</button>
        </div>
      </TableData>
    </tr>
  );
}

function TableHeader({ children }) {
  return (
    <th
      className={
        "py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400"
      }
    >
      {children}
    </th>
  );
}

function TableData({ children, className }) {
  return <td className={`py-4 px-4 ${className}`}>{children}</td>;
}
