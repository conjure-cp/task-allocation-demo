export default function findNextId(state, type, idKey) {
  const cur = state[type].map((x) => parseInt(x[idKey]));
  let max = Math.max(...cur);

  if (state.output_history && state.output_history.length > 0) {
    const old = state.output_history
      .find((oh) => oh.output_id === state.current_selected_output_id)
      .state[type].map((x) => parseInt(x[idKey]));
    max = Math.max(max, Math.max(...old));
  }

  return max + 1;
}
