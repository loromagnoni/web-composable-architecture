import produce from "immer";
import { pipe } from "./utils";
import "reflect-metadata";

export type Module<State, Action extends string[]> = {
  initialState: () => State;
  reducer: Record<Action[number], (s: State) => void>;
};

type Props<State, Action extends string[]> = {
  initialState: () => State;
  reducer: Record<Action[number], (s: State) => void>;
};

const isSubReducer = (
  reducer: any
): reducer is { reducer: CallableFunction; selector: CallableFunction } =>
  reducer.reducer !== undefined && reducer.selector !== undefined;

const bindReducer = (
  reducer: any,
  getState: any,
  setState: any,
  selector: any = (state: any) => state
): any => {
  return Object.fromEntries(
    Object.entries(reducer).map(([key, fn]) => [
      key,
      typeof fn === "function"
        ? () => {
            const newState = produce(getState(), (draft: any) => {
              return (fn as any)(selector ? selector(draft) : draft);
            });
            setState(newState);
          }
        : isSubReducer(fn)
        ? bindReducer(
            fn.reducer,
            getState,
            setState,
            pipe(selector, fn.selector)
          )
        : bindReducer(fn, getState, setState),
    ])
  );
};

export function defineModule<
  State,
  Action extends string[],
  Environment extends Object
>(creator: any) {
  return {
    composable: (arg?: any) => {
      const { initialState, reducer } = creator(arg);
      return {
        initialState,
        reducer,
      };
    },

    create: (arg?: any) => {
      const { initialState, reducer } = creator(arg);
      let listeners: any[] = [];
      let state = structuredClone(initialState());
      const setState = (newState: any) => {
        state = newState;
        for (let listener of listeners) {
          listener();
        }
      };
      const getState = () => {
        return state;
      };
      return {
        send: bindReducer(reducer, getState, setState),
        subscribe(listener: any) {
          listeners = [...listeners, listener];
          return () => {
            listeners = listeners.filter((l) => l !== listener);
          };
        },
        getState,
      };
    },
  };
}

export const combine = (modules: any) => {
  return defineModule((arg: any) => {
    const mapped = Object.fromEntries(
      Object.entries(modules).map(([key, module]) => [
        key,
        (module as any).composable(arg),
      ])
    );
    return {
      initialState: () => {
        return Object.fromEntries(
          Object.entries(mapped).map(([key, module]) => [
            key,
            (module as any).initialState(),
          ])
        );
      },
      reducer: Object.fromEntries(
        Object.entries(mapped).map(([key, module]) => [
          key,
          {
            selector: (state: any) => state[key],
            reducer: (module as any).reducer,
          },
        ])
      ),
    };
  });
};
