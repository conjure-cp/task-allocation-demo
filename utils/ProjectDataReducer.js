export default function projectDataReducer(state, action) {
  // TODO add actions
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
            weight: 26,
          },
          {
            id: 1,
            name: "Teach CS3102",
            description: "This module is something and yea",
            category: 0,
            weight: 2,
          },
        ],
        users: [],
        categories: [{ id: 0, name: "Teaching" }],
      };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: state.tasks.length,
            name: action.name,
            description: action.description,
            category: action.category,
            weight: action.weight,
          },
        ],
      };

    default:
      return state;
  }
}
