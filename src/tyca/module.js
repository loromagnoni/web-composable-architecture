import produce from "immer";
import { applyPlugins } from "./plugin";

const bindReducer = (
  sendRef,
  reducer,
  getState,
  setState,
  selector = (state) => state
) => {
  const dispatcher = Object.fromEntries(
    Object.entries(reducer).map(([key, fn]) => [
      key,
      (payload) => {
        let effect;
        const newState = produce(getState(), (draft) => {
          effect = fn(selector ? selector(draft) : draft, payload);
        });
        setState(newState);
        if (effect && typeof effect === "function") effect(sendRef.current);
      },
    ])
  );
  return dispatcher;
};

export const createStore = (creator) => {
  return {
    composable: creator,
    create: (arg) => {
      const { state: stateDef, reducer, compose } = creator(arg);
      let listeners = [];
      let state = structuredClone(stateDef);
      const setState = (newState) => {
        state = newState;
        for (let listener of listeners) {
          listener();
        }
      };
      const getState = () => {
        return state;
      };
      const sendRef = {};
      sendRef.current = applyPlugins(
        bindReducer(sendRef, reducer, getState, setState),
        getState
      );
      return {
        send: sendRef.current,
        subscribe(listener) {
          listeners = [...listeners, listener];
          return () => {
            listeners = listeners.filter((l) => l !== listener);
          };
        },
        getState,
      };
    },
  };
};

export const combine = (modules) => {
  return createStore((arg) => {
    const mapped = Object.fromEntries(
      Object.entries(modules).map(([key, module]) => [
        key,
        module.composable(arg),
      ])
    );
    return {
      initialState: () => {
        return Object.fromEntries(
          Object.entries(mapped).map(([key, module]) => [
            key,
            module.initialState(),
          ])
        );
      },
      reducer: Object.fromEntries(
        Object.entries(mapped).map(([key, module]) => [
          key,
          {
            selector: (state) => state[key],
            reducer: module.reducer,
          },
        ])
      ),
    };
  });
};
