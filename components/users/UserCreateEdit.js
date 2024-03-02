import Input from "../ui/Input";
import Select from "../ui/Select";
import { useState } from "react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import TableData from "../ui/TableData";
import TableHeader from "../ui/TableHeader";
import useProjectData from "../../utils/ProjectDataContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export function UserCreator({ onSubmit }) {
  return (
    <UserForm
      initialName={""}
      initialCategories={[]}
      initialDisallowedTasks={[]}
      initialTasks={[]}
      handleSubmit={onSubmit}
      buttonText={"Create User"}
    />
  );
}

export function UserEditor({ user, onSubmit }) {
  return (
    <UserForm
      initialName={user.name}
      initialCategories={user.categories}
      initialDisallowedTasks={user.task_blacklist}
      initialTasks={user.preferences}
      handleSubmit={onSubmit}
      buttonText={"Save User"}
    />
  );
}

function UserForm({
  initialName,
  initialCategories,
  initialDisallowedTasks,
  initialTasks,
  handleSubmit,
  buttonText,
}) {
  const MAX_STEPS = 4;
  const [currentStep, setCurrentStep] = useState(1);

  const [projectData, dispatch, loading] = useProjectData();

  const [name, setName] = useState(initialName);

  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [categories, setCategories] = useState(initialCategories);

  const [createCategory, setCreateCategory] = useState("");

  const [disallowedTasks, setDisallowedTasks] = useState(
    initialDisallowedTasks,
  );

  const [selectedTask, setSelectedTask] = useState(-1);
  const [tasks, setTasks] = useState(initialTasks);

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (categories.includes((c) => c.id === parseInt(selectedCategory))) {
      // already allocated this category
      setSelectedCategory(-1);
      return;
    }

    setCategories((old) => [
      ...old,
      { id: parseInt(selectedCategory), percentage: 0 },
    ]);
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
      }),
    );
  };

  const handleRemoveAllocation = (catId) => {
    setCategories((old) => old.filter((c) => c.id !== catId));
  };

  const handleToggleTaskAllowed = (taskId) => {
    if (disallowedTasks.includes(taskId)) {
      setDisallowedTasks((old) => old.filter((t) => t !== taskId));
    } else {
      setDisallowedTasks((old) => [...old, taskId]);
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (tasks.includes(selectedTask)) {
      // already selected this task
      setSelectedTask(-1);
      return;
    }

    setTasks((old) => [...old, selectedTask]);
    setSelectedTask(-1);
  };

  const handleRemoveTask = (taskId) => {
    setTasks((old) => old.filter((t) => parseInt(t) !== parseInt(taskId)));
  };

  return (
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
                {projectData.tasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    isDisallowed={disallowedTasks.includes(task.id)}
                    onToggle={handleToggleTaskAllowed}
                  />
                ))}
              </tbody>
            </table>
          </>
        )}
        {currentStep === 4 && (
          <>
            <p className={"font-medium"}>Task preferences</p>
            <div
              id="taskPerference"
              className={"mt-4 flex items-center space-x-4"}
            >
              <Select
                placeholder={"Select..."}
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
              >
                {projectData.tasks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </Select>
              <button
                className={"border py-2 px-2 hover:underline"}
                onClick={handleAddTask}
              >
                Add
              </button>
            </div>
            <div className={"mt-4"}>
              {tasks.length === 0 ? (
                <p className={"text-sm text-slate-300"}>
                  There are currently no tasks preferences.
                </p>
              ) : (
                <>
                  <DragDropContext
                    onDragEnd={(result) => {
                      if (
                        !result.destination ||
                        result.destination.index === result.source.index
                      ) {
                        return;
                      }

                      const copy = Array.from(tasks);
                      const [removed] = copy.splice(result.source.index, 1);
                      copy.splice(result.destination.index, 0, removed);
                      setTasks(copy);
                    }}
                  >
                    <table
                      className={
                        "w-2/3 divide-y-2 divide-slate-600 border border-slate-600"
                      }
                    >
                      <thead className={"bg-slate-800"}>
                        <tr>
                          <TableHeader>Rank</TableHeader>
                          <TableHeader>Task</TableHeader>
                          <TableHeader />
                        </tr>
                      </thead>
                      <Droppable droppableId={"table"}>
                        {(droppableProvided) => (
                          <tbody
                            className={"divide-y divide-slate-600"}
                            ref={droppableProvided.innerRef}
                            {...droppableProvided.droppableProps}
                          >
                            {tasks.map((t, i) => (
                              <Draggable
                                draggableId={t.toString()}
                                index={i}
                                key={t.toString()}
                              >
                                {(provided, snapshot) => (
                                  <PreferenceRow
                                    rank={i + 1}
                                    task={projectData.tasks.find(
                                      (tt) => tt.id === parseInt(t),
                                    )}
                                    onRemove={handleRemoveTask}
                                    provided={provided}
                                    snapshot={snapshot}
                                  />
                                )}
                              </Draggable>
                            ))}
                            {droppableProvided.placeholder}
                          </tbody>
                        )}
                      </Droppable>
                    </table>
                  </DragDropContext>
                  <p className={"mt-8 text-sm text-slate-500"}>
                    Click and drag tasks into preference order.
                  </p>
                </>
              )}
            </div>
          </>
        )}
        <button
          id="continueButton"
          onClick={(e) => {
            e.preventDefault();

            if (currentStep < MAX_STEPS) {
              // next step of user creation
              setCurrentStep(currentStep + 1);
            } else {
              // finish creating user
              handleSubmit(name, disallowedTasks, tasks, categories);
            }
          }}
          className={"mt-12 border py-2 px-2 hover:underline"}
        >
          {currentStep === MAX_STEPS ? buttonText : "Continue"}
        </button>
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

function TaskRow({ task, isDisallowed, onToggle }) {
  return (
    <tr>
      <TableData className={"flex flex-col items-start space-y-1"}>
        <p>{task.name}</p>
        <p className={"text-sm text-slate-400"}>{task.description}</p>
      </TableData>
      <TableData>
        <div className={"flex items-center space-x-4"}>
          <button
            className={"text-sm underline"}
            onClick={(e) => {
              e.preventDefault();
              onToggle(task.id);
            }}
          >
            {isDisallowed ? "No" : "Yes"}
          </button>
        </div>
      </TableData>
    </tr>
  );
}

function PreferenceRow({ rank, task, onRemove, provided, snapshot }) {
  return (
    <tr
      ref={provided.innerRef}
      className={snapshot.isDragging ? "table" : ""}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <TableData className={"w-24"}>
        <span
          className={`bg-slate-800 py-1 px-2 text-xs font-medium uppercase tracking-wider`}
        >
          <code>{rank}</code>
        </span>
      </TableData>
      <TableData className={"flex flex-col items-start space-y-1"}>
        <p>{task.name}</p>
        <p className={"text-sm text-slate-400"}>{task.description}</p>
      </TableData>
      <TableData>
        <div className={"flex justify-end"}>
          <button
            className={"text-sm hover:underline"}
            onClick={(e) => {
              e.preventDefault();
              onRemove(task.id);
            }}
          >
            Remove
          </button>
        </div>
      </TableData>
    </tr>
  );
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
