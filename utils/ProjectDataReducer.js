import findNextId from "./max-id";

const ACTIONS_NOT_ELICITING_UNSAVED_CHANGES = [
  "NEW_PROJECT",
  "SELECT_OUTPUT_VERSION",
  "ADD_OUTPUT",
  "WAIT_OUTPUT",
];

export default function projectDataReducer(state, action) {
  // result from actual reducer
  let result = { ...innerProjectDataReducer(state, action) };

  // if previous outputs have been generated, then we want to keep track of any unsaved changes.
  // unsaved changes are any changes (eg add/edit task) made after an output has been generated.
  // this is to notify the user that they have made changes and should re-generate the output.

  // some actions do not elicit making a change and hence are not included

  if (
    !ACTIONS_NOT_ELICITING_UNSAVED_CHANGES.includes(action.type) &&
    result.output_history &&
    result.output_history.length !== 0
  ) {
    // set unsaved changes flag on top of reducer's result
    result.unsaved_changes = true;
  }

  return result;
}

function innerProjectDataReducer(state, action) {
  switch (action.type) {
    case "NEW_PROJECT":
      return {
        id: 0,
        name: action.projectName,
        tasks: [],
        users: [],
        categories: [],
        locked_tasks: [],
      };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: findNextId(state, "tasks", "id"),
            name: action.name,
            description: action.description,
            category: action.category,
            weight: action.weight,
          },
        ],
      };

    case "EDIT_TASK": {
      let arr = [...state.tasks];
      const index = arr.findIndex((t) => t.id === action.taskId);
      arr[index] = {
        id: action.taskId,
        name: action.name,
        description: action.description,
        category: action.category,
        weight: action.weight,
      };
      return { ...state, tasks: arr };
    }

    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [
          ...state.categories,
          {
            id: findNextId(state, "categories", "id"),
            name: action.name,
          },
        ],
      };

    case "ADD_USER":
      return {
        ...state,
        users: [
          ...state.users,
          {
            id: findNextId(state, "users", "id"),
            name: action.name,
            task_blacklist: action.task_blacklist,
            preferences: action.preferences,
            categories: action.categories,
          },
        ],
      };

    case "REMOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== parseInt(action.taskId)),
        users: state.users.map((u) => ({
          ...u,
          task_blacklist: u.task_blacklist.filter(
            (x) => x !== parseInt(action.taskId)
          ),
          preferences: u.preferences.filter(
            (x) => x !== parseInt(action.taskId)
          ),
        })),
        locked_tasks: state.locked_tasks
          ? [...state.locked_tasks.filter((x) => x !== parseInt(action.taskId))]
          : [],
      };

    case "DUPLICATE_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.task,
            id: findNextId(state, "tasks", "id"),
          },
        ],
      };

    case "USER_ALLOW_TASK": {
      let arr = [...state.users];
      const index = arr.findIndex((u) => u.id === action.user);
      let u = arr[index];
      u.task_blacklist = u.task_blacklist.filter((t) => t !== action.task);
      arr[index] = u;
      return { ...state, users: arr };
    }

    case "USER_DISALLOW_TASK": {
      let arr = [...state.users];
      const index = arr.findIndex((u) => u.id === action.user);
      const u = arr[index];
      if (u.task_blacklist.includes(action.task)) {
        return { ...state };
      }
      u.task_blacklist = [...u.task_blacklist, action.task];
      arr[index] = u;
      return { ...state, users: arr };
    }

    case "REMOVE_CATEGORY":
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          if (t.category === action.category) {
            let tt = { ...t };
            delete tt.category;
            return tt;
          } else {
            return t;
          }
        }),
        users: state.users.map((u) => {
          return {
            ...u,
            categories: u.categories.filter((c) => c.id !== action.category),
          };
        }),
        categories: state.categories.filter((c) => c.id !== action.category),
      };

    case "DUPLICATE_CATEGORY":
      return {
        ...state,
        categories: [
          ...state.categories,
          {
            ...action.category,
            id: findNextId(state, "categories", "id"),
          },
        ],
      };

    case "EDIT_CATEGORY": {
      let arr = [...state.categories];
      const index = arr.findIndex((c) => c.id === action.categoryId);
      arr[index] = {
        id: action.categoryId,
        name: action.name,
      };
      return { ...state, categories: arr };
    }

    case "EDIT_USER": {
      let arr = [...state.users];
      const index = arr.findIndex((u) => u.id === action.userId);
      arr[index] = {
        id: action.userId,
        name: action.name,
        categories: action.categories,
        task_blacklist: action.task_blacklist,
        preferences: action.preferences,
      };
      return { ...state, users: arr };
    }

    case "REMOVE_USER": {
      let obj = {
        ...state,
        users: state.users.filter((u) => u.id !== parseInt(action.userId)),
      };

      const assignment = state.output_history
        ? state.output_history.find(
            (oh) => oh.output_id === state.current_selected_output_id
          ).solution.assignment
        : {};

      obj.locked_tasks = state.locked_tasks
        ? [
            ...state.locked_tasks.filter(
              (tid) =>
                parseInt(assignment[tid + 1]) !== parseInt(action.userId) + 1
            ),
          ]
        : [];

      return obj;
    }

    case "DUPLICATE_USER":
      return {
        ...state,
        users: [
          ...state.users,
          {
            ...action.user,
            id: findNextId(state, "users", "id"),
          },
        ],
      };

    case "WAIT_OUTPUT": {
      const new_output_id = action.job_id

      const new_output_state = {
        status: "wait",
        job_id: action.job_id,
        state: {
          tasks: [...state.tasks],
          users: [...state.users],
          categories: [...state.categories],
          locked_tasks: state.locked_tasks ? [...state.locked_tasks] : [],
        },
        output_id: new_output_id,
        date: Date.now(),
      };

      return {
        ...state,
        current_selected_output_id: new_output_id,
        unsaved_changes: false,
        locked_tasks: [],
        output_history: (state.output_history ?? []).length > 0
          ? [...state.output_history, new_output_state]
          : [new_output_state],
      };
    }

    case "ADD_OUTPUT": {
      let obj = { ...state };

      const hist_obj = { ...obj.output_history.at(-1) };

      if (
        action.output.status === "ok" &&
        action.output.solution &&
        action.output.solution.length > 0
      ) {
        hist_obj.status = "ok";
        hist_obj.solution = action.output.solution[0];
      } else {
        hist_obj.status = action.output.status;
      }

      const arr = [...obj.output_history];
      arr[arr.length - 1] = hist_obj;
      obj.output_history = arr;

      return obj;
    }

    case "SET_LOCKED_TASKS":
      return {
        ...state,
        locked_tasks: action.tasks,
      };

    case "SELECT_OUTPUT_VERSION": {
      let obj = { ...state };

      const version = obj.output_history.find(
        (o) => o.output_id === action.versionId
      );

      // set current state to old state
      obj.tasks = [...version.state.tasks];
      obj.users = [...version.state.users];
      obj.categories = [...version.state.categories];
      obj.locked_tasks = [...version.state.locked_tasks];

      obj.current_selected_output_id = version.output_id;
      obj.unsaved_changes = false;
      obj.locked_tasks = [];

      return obj;
    }

    default:
      return state;
  }
}
