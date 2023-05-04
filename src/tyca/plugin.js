const plugins = [];

export const registerPlugin = (plugin) => plugins.push(plugin);

export const applyPlugins = (reducer, getState) => {
  const res = Object.fromEntries(
    Object.entries(reducer).map(([key, handler]) => [
      key,
      (arg) => {
        const oldState = getState();
        handler(arg);
        const newState = getState();
        plugins.forEach((p) => p(oldState, newState, { name: key, handler }));
      },
    ])
  );
  return res;
};
