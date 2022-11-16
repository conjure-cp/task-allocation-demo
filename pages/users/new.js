import { useState } from "react";

export default function NewUserPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>New User</h1>
        <p className={"text-slate-300"}>
          Some description about how users data is used or whatever.
        </p>
      </div>
      <div className={"mt-8"}>
        <div className={"flex space-x-8"}>
          <Step id={1} currentStep={currentStep}>
            Basic details
          </Step>
          <Step id={2} currentStep={currentStep}>
            Task categories
          </Step>
          <Step id={3} currentStep={currentStep}>
            Possible tasks
          </Step>
          <Step id={4} currentStep={currentStep}>
            Task preferences
          </Step>
        </div>
        <div className={"mt-12"}>
          {currentStep === 1 && (
            <>
              <Input label={"Name"} placeholder={"John Smith"} />
            </>
          )}
          {currentStep === 2 && (
            <>
              <p className={"text-slate-300"}>
                Some description about what task categories are, why they are
                assigned, etc.
              </p>
              <div className={"mt-12 flex space-x-40"}>
                <div className={"flex-1"}>
                  <p className={"font-medium"}>Selected categories</p>
                  <div className={"mt-4 flex items-center space-x-4"}>
                    <Select placeholder={"Select..."}>
                      <option>Test A</option>
                      <option>Test B</option>
                      <option>Test C</option>
                    </Select>
                    <button className={"border py-2 px-2 hover:underline"}>
                      Add
                    </button>
                  </div>
                  <div className={"mt-8 min-h-[176px] border"}>
                    {/* magic number because height of 3x items */}
                    <div
                      className={
                        "flex items-center justify-between border px-6 py-4"
                      }
                    >
                      <p>Teaching</p>
                      <button className={"text-sm underline"}>20%</button>
                    </div>
                    <div
                      className={
                        "flex items-center justify-between border px-6 py-4"
                      }
                    >
                      <p>Admin</p>
                      <button className={"text-sm underline"}>10%</button>
                    </div>
                    <div
                      className={
                        "flex items-center justify-between border px-6 py-4"
                      }
                    >
                      <p>Research</p>
                      <button className={"text-sm underline"}>30%</button>
                    </div>
                  </div>
                  <p className={"mt-8 text-sm text-slate-500"}>
                    This user has 60% of their tasks allocated to categories.
                    <br />
                    Any remaining space will be filled by tasks outside of the
                    specified categories.
                  </p>
                </div>
                <div className={"flex-1"}>
                  <p className={"font-medium"}>Create category</p>
                  <p className={"text-slate-300"}>
                    Tasks can be added to a newly created category later.
                  </p>
                  <Input
                    label={"Name"}
                    placeholder={"Some category"}
                    className={"mt-8"}
                  />
                  <button className={"mt-8 border p-2 hover:underline"}>
                    Create
                  </button>
                </div>
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <table
                className={
                  "mt-4 w-1/2 divide-y-2 divide-slate-600 border border-slate-600"
                }
              >
                <thead className={"bg-slate-800"}>
                  <tr>
                    <TableHeader>Task</TableHeader>
                    <TableHeader>Allowed</TableHeader>
                  </tr>
                </thead>
                <tbody className={"divide-y divide-slate-600"}>
                  <TaskRow />
                  <TaskRow />
                  <TaskRow />
                </tbody>
              </table>
            </>
          )}
          {currentStep === 4 && (
            <>
              <p className={"font-medium"}>Task preferences</p>
              <div className={"mt-4 flex items-center space-x-4"}>
                <Select placeholder={"Select..."}>
                  <option>Test A</option>
                  <option>Test B</option>
                  <option>Test C</option>
                </Select>
                <button className={"border py-2 px-2 hover:underline"}>
                  Add
                </button>
              </div>
              <table
                className={
                  "mt-4 w-2/3 divide-y-2 divide-slate-600 border border-slate-600"
                }
              >
                <thead className={"bg-slate-800"}>
                  <tr>
                    <TableHeader>Rank</TableHeader>
                    <TableHeader>Task</TableHeader>
                    <TableHeader />
                  </tr>
                </thead>
                <tbody className={"divide-y divide-slate-600"}>
                  <PreferenceRow rank={1} />
                  <PreferenceRow rank={2} />
                  <PreferenceRow rank={3} />
                </tbody>
              </table>
              <p className={"mt-8 text-sm text-slate-500"}>
                Click and drag tasks into preference order.
              </p>
            </>
          )}
          {/* TODO replace click functionality */}
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className={"mt-12 border py-2 px-2 hover:underline"}
          >
            {currentStep === 4 ? "Create User" : "Continue"}
          </button>
        </div>
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
      <TableData>
        <div className={"flex items-center space-x-4"}>
          <button className={"text-sm underline"}>Yes</button>
          {/* click to change to "no" */}
        </div>
      </TableData>
    </tr>
  );
}

function PreferenceRow({ rank }) {
  return (
    <tr>
      <TableData>
        <span
          className={
            "bg-slate-800 py-1 px-2 text-xs font-medium uppercase tracking-wider"
          }
        >
          {rank}
        </span>
      </TableData>
      <TableData className={"flex flex-col items-start space-y-1"}>
        <button className={"hover:underline"}>Teach CS3102</button>
        <p className={"text-sm text-slate-400"}>
          This module is something and yea...
        </p>
      </TableData>
      <TableData>
        <div className={"flex justify-end"}>
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

function Step({ id, children, currentStep }) {
  const completed = id <= currentStep;

  return (
    <div
      className={`flex-1 border-t-4 ${
        completed ? "border-slate-400" : "border-slate-600"
      } py-4`}
    >
      <p
        className={`text-sm font-medium ${
          completed ? "text-slate-400" : "text-slate-500"
        }`}
      >
        Step {id}
      </p>
      <p
        className={`font-medium ${
          completed ? "text-slate-300" : "text-slate-400"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

function Input({ label, placeholder, width = "w-72", className }) {
  return (
    <div className={className}>
      <p
        className={
          "text-xs font-semibold uppercase tracking-wider text-slate-400"
        }
      >
        {label}
      </p>
      <input
        type={"text"}
        className={`mt-1 ${width} border border-white/5 bg-slate-800/75 py-2.5 px-4 text-sm placeholder-slate-500`}
        placeholder={placeholder}
      />
    </div>
  );
}

function Select({ label, placeholder, children }) {
  return (
    <div>
      {label && (
        <p
          className={
            "text-xs font-semibold uppercase tracking-wider text-slate-400"
          }
        >
          {label}
        </p>
      )}
      <select
        required
        className={`${
          label && "mt-1"
        } w-72 border border-white/5 bg-slate-800/75 py-2.5 px-4 text-sm invalid:text-slate-500`}
      >
        <option value={""} disabled selected>
          {placeholder}
        </option>
        {children}
      </select>
    </div>
  );
}
