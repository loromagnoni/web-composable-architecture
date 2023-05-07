import produce from "immer";
import { applyPlugins } from "./plugin";

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

const bindReducer = (
  sendRef,
  reducer,
  getRootState,
  setRootState,
  selector = (s) => s
) => {
  const dispatcher = Object.fromEntries(
    Object.entries(reducer).map(([key, fn]) => [
      key,
      (payload) => {
        let effect;
        const newState = produce(getRootState(), (draft) => {
          effect = fn(selector(draft), payload);
        });
        setRootState(newState);
        if (effect && typeof effect === "function") effect(sendRef.current);
      },
    ])
  );
  return dispatcher;
};

const bindSubModules = (
  compose,
  arg,
  getRootState,
  setRootState,
  selector = (s) => s
) => {
  return Object.fromEntries(
    Object.entries(compose).map(([key, creator]) => {
      const { reducer, compose } = creator.composable(arg);
      let listeners = [];
      const setState = (newState) => {
        setRootState(newState);
        for (let listener of listeners) {
          listener();
        }
      };
      const getState = () => {
        return selector(getRootState())[key];
      };
      const sendRef = {};
      sendRef.current =
        reducer &&
        applyPlugins(
          bindReducer(
            sendRef,
            reducer,
            getRootState,
            setState,
            pipe(selector, (s) => s[key])
          ),
          getRootState
        );
      const subStore = {
        send: sendRef.current,
        subscribe(listener) {
          listeners = [...listeners, listener];
          return () => {
            listeners = listeners.filter((l) => l !== listener);
          };
        },
        getState,
        ...(compose && {
          compose: bindSubModules(
            compose,
            arg,
            getRootState,
            setRootState,
            (s) => s[key]
          ),
        }),
      };
      return [key, subStore];
    })
  );
};

const composedState = (compose, arg) => {
  return Object.fromEntries(
    Object.entries(compose).map(([key, creator]) => {
      const { state: stateDef, compose } = creator.composable(arg);
      return [
        key,
        structuredClone({
          ...stateDef,
          ...(compose && composedState(compose, arg)),
        }),
      ];
    })
  );
};

export const createStore = (creator) => {
  return {
    composable: creator,
    create: (arg) => {
      const { state: stateDef, reducer, compose } = creator(arg);
      let listeners = [];
      let state = structuredClone({
        ...stateDef,
        ...(compose && composedState(compose, arg)),
      });
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
      sendRef.current =
        reducer &&
        applyPlugins(
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
        ...(compose && {
          compose: bindSubModules(compose, arg, getState, setState),
        }),
      };
    },
  };
};
