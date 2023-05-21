export default function (fn) {
  return (state, action) => {
    const effect = fn(state, action);
    if (effect) action.runEffect(effect);
  };
}
