import { useState } from "react";
import useProjectData from "../../utils/ProjectDataContext";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function NewUserPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [projectData, dispatch, loading] = useProjectData();

  const [name, setName] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [categories, setCategories] = useState([]);

  const [createCategory, setCreateCategory] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (categories.includes((c) => c.id === selectedCategory)) {
      // already allocated this category
      setSelectedCategory(-1);
      return;
    }

    setCategories((old) => [...old, { id: selectedCategory, percentage: 0 }]);

    setSelectedCategory(-1);
  };

  const handleSaveAllocation = (catId, percentage) => {
    setCategories((old) =>
      old.map((c) => {
        if (c.id === catId) {
          return { id: c.id, percentage: percentage };
        } else {
          return c;
        }
      })
    );
  };

  const handleRemoveAllocation = (catId) => {
    setCategories((old) => old.filter((c) => c.id !== catId));
  };

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
              <Input
                label={"Name"}
                placeholder={"John Smith"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
                    <Select
                      placeholder={"Select..."}
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {projectData.categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </Select>
                    <button
                      className={"border py-2 px-2 hover:underline"}
                      onClick={handleAddCategory}
                    >
                      Add
                    </button>
                  </div>
                  <div className={"mt-8 min-h-[176px] border"}>
                    {/* magic number because height of 3x items */}
                    {categories.length === 0 && (
                      <div
                        className={
                          "flex h-[176px] w-full items-center justify-center"
                        }
                      >
                        <p className={"text-sm text-slate-400"}>
                          Select categories to be allocated.
                        </p>
                      </div>
                    )}
                    {categories.map((c) => (
                      <CategoryAllocationRow
                        key={c.id}
                        category={c}
                        categories={projectData.categories}
                        onSave={handleSaveAllocation}
                        onRemove={handleRemoveAllocation}
                      />
                    ))}
                  </div>
                  <p className={"mt-8 text-sm text-slate-500"}>
                    This user has{" "}
                    {categories
                      .map((c) => parseInt(c.percentage))
                      .reduce((ps, a) => ps + a, 0)}
                    % of their tasks allocated to categories.
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
                    divClassName={"mt-8"}
                    value={createCategory}
                    onChange={(e) => setCreateCategory(e.target.value)}
                  />
                  {/* TODO make this a form, and make this actually work nicely (eg notify you it worked) */}
                  <button
                    className={"mt-8 border p-2 hover:underline"}
                    onClick={(e) => {
                      e.preventDefault();

                      dispatch({
                        type: "ADD_CATEGORY",
                        name: createCategory,
                      });

                      setCreateCategory("");
                    }}
                  >
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

function CategoryAllocationRow({ category, categories, onSave, onRemove }) {
  const [changing, setChanging] = useState(false);
  const [percentage, setPercentage] = useState(category.percentage);

  return (
    <div className={"flex items-center justify-between border px-6 py-4"}>
      <p>{categories.find((c) => c.id === parseInt(category.id)).name}</p>
      {!changing ? (
        <button
          className={"text-sm underline"}
          onClick={(e) => setChanging(true)}
        >
          {category.percentage}%
        </button>
      ) : (
        <div className={"inline-flex items-center space-x-2"}>
          <div className={"relative"}>
            <Input
              className={"block"}
              width={"w-28"}
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
            <div
              className={
                "pointer-events-none absolute inset-y-0 right-0 mt-1 flex items-center pr-3"
              }
            >
              <span className={"text-sm text-slate-400"}>%</span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onSave(category.id, percentage);
              setChanging(false);
            }}
          >
            <CheckCircleIcon className={"h-5 w-5"} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onRemove(category.id);
            }}
          >
            <TrashIcon className={"h-5 w-5"} />
          </button>
        </div>
      )}
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
