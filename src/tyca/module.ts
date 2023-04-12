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
>(creator: (arg: Environment) => any) {
  const environment: Partial<Environment> = {};

  const inject = (obj: Partial<Environment>) => {
    Object.entries(obj).forEach((entry) => {
      const key = entry[0] as keyof Environment;
      const dep = entry[1] as Environment[keyof Environment];
      environment[key] = dep;
    });
  };

  const createInjector = (dependencies: any) => {
    return new Proxy(
      {},
      {
        get: (target: any, property: string) => {
          if (!(property in target)) {
            if (!(property in dependencies)) {
              throw new Error(`Dependency ${property} not found`);
            }
            target[property] = dependencies[property];
          }
          return target[property];
        },
      }
    );
  };

  const withEnvironment = () => {
    const injector = createInjector(environment);
    return creator(injector);
  };

  return {
    composable: () => {
      const { initialState, reducer } = withEnvironment();
      return {
        initialState,
        reducer,
      };
    },
    inject,
    create: () => {
      const { initialState, reducer } = withEnvironment();
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
  const mapped = Object.fromEntries(
    Object.entries(modules).map(([key, module]) => [
      key,
      (module as any).composable(),
    ])
  );
  return defineModule(() => ({
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
  }));
};
