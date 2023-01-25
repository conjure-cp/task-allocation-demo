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

    default:
      return state;
  }
}
