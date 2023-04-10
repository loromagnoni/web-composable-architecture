import produce from "immer";

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
  selector?: any
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
        ? bindReducer(fn.reducer, getState, setState, fn.selector)
        : bindReducer(fn, getState, setState),
    ])
  );
};

export function defineModule<State, Action extends string[]>(props: any): any {
  const { initialState, reducer } = props();
  return {
    composable: () => {
      return {
        initialState,
        reducer,
      };
    },
    create: () => {
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
  return defineModule(() => ({
    initialState: () => {
      return Object.fromEntries(
        Object.entries(modules).map(([key, module]) => [
          key,
          (module as any).initialState(),
        ])
      );
    },
    reducer: Object.fromEntries(
      Object.entries(modules).map(([key, module]) => [
        key,
        {
          selector: (state: any) => state[key],
          reducer: (module as any).reducer,
        },
      ])
    ),
  }));
};
