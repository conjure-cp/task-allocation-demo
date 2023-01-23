export default function projectDataReducer(state, action) {
  // TODO add actions
  switch (action.type) {
    case "inc_id_test":
      return { ...state, id: state.id + 1 };

    case "NEW_PROJECT":
      return { id: 0, name: "My test project" };

    default:
      return state;
  }
}
