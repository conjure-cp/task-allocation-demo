import Link from "next/link";

export default function UsersPage() {
  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>Users Data</h1>
        <p className={"text-slate-300"}>
          Some description about how users data is used or whatever.
        </p>
      </div>
      <div className={"mt-8"}>
        <Link href={"/users/new"} className={"border py-2 px-2 hover:underline"}>New User</Link>
        <table
          className={
            "mt-4 w-full divide-y-2 divide-slate-600 border border-slate-600"
          }
        >
          <thead className={"bg-slate-800"}>
            <tr>
              <TableHeader>User</TableHeader>
              <TableHeader>Task Categories</TableHeader>
              <TableHeader>Possibilities</TableHeader>
              <TableHeader>Preferences</TableHeader>
              <TableHeader />
            </tr>
          </thead>
          <tbody className={"divide-y divide-slate-600"}>
            <UserRow />
            <UserRow />
            <UserRow />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserRow() {
  return (
    <tr>
      <TableData>
        <button className={"hover:underline"}>John Smith</button>
      </TableData>
      <TableData className={"flex items-center space-x-4"}>
        <div className={"flex flex-col"}>
          <p className={"text-xs text-slate-500"}>20%</p>
          <p className={"text-sm"}>Teaching</p>
        </div>
        <div className={"flex flex-col"}>
          <p className={"text-xs text-slate-500"}>10%</p>
          <p className={"text-sm"}>Admin</p>
        </div>
        <div className={"flex flex-col"}>
          <p className={"text-xs text-slate-500"}>30%</p>
          <p className={"text-sm"}>Research</p>
        </div>
        <p className={"text-sm text-slate-500"}>+ 2</p>
      </TableData>
      <TableData>
        14 <span className={"text-slate-500"}>/</span> 20
      </TableData>
      <TableData>
        <span
          className={
            "bg-slate-800 py-1 px-2 text-xs font-medium uppercase tracking-wider"
          }
        >
          4 Allocated
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
