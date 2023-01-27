export default function projectDataReducer(state, action) {
  switch (action.type) {
    case "inc_id_test":
      return { ...state, id: state.id + 1 };

    case "NEW_PROJECT":
      return {
        id: 0,
        name: "My test project",
        tasks: [
          {
            id: 0,
            name: "Test task",
            description: "Some test description fo this task",
            category: 1,
            weight: 26,
          },
          {
            id: 1,
            name: "Teach CS3102",
            description: "This module is something and yea",
            category: 0,
            weight: 2,
          },
          {
            id: 2,
            name: "Teach EC4000",
            description: "This module is something and yea",
            category: 0,
            weight: 2,
          },
          {
            id: 3,
            name: "Some admin",
            description: "This module is something and yea",
            category: 1,
            weight: 6,
          },
        ],
        users: [
          {
            id: 0,
            name: "John Smith",
            categories: [
              { id: 0, percentage: 20 },
              { id: 1, percentage: 10 },
              { id: 2, percentage: 30 },
            ],
            task_blacklist: [1],
            preferences: [2, 0],
          },
        ],
        categories: [
          { id: 0, name: "Teaching" },
          { id: 1, name: "Admin" },
          { id: 2, name: "Research" },
        ],
      };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Math.max(...state.tasks.map((x) => parseInt(x.id))) + 1,
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
            id: Math.max(...state.categories.map((x) => parseInt(x.id))) + 1,
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
            id: Math.max(...state.users.map((x) => parseInt(x.id))) + 1,
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
        tasks: state.tasks.filter(
          (t) => parseInt(t.id) !== parseInt(action.taskId)
        ),
      };

    case "DUPLICATE_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.task,
            id: Math.max(...state.tasks.map((x) => parseInt(x.id))) + 1,
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

    default:
      return state;
  }
}
