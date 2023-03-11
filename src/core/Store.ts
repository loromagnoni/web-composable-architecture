import ReducerProtocol, { ReducerFunction } from "./ReducerProtocol";

type StoreProps<State, Action> = {
  initialState: State;
  reducer: ReducerFunction<State, Action>;
};

export type InferState<F> = F extends ReducerProtocol<infer T, any> ? T : never;
export type InferAction<F> = F extends ReducerProtocol<any, infer T>
  ? T
  : never;

export type StoreOf<F extends ReducerProtocol<InferState<F>, InferAction<F>>> =
  Pick<Store<InferState<F>, InferAction<F>>, "dispatch" | "state">;

export type Store<State, Action> = {
  state: State;
  dispatch: (a: Action) => void;
  subscribe: any;
  getSnapshot: () => State;
};
export default function createStore<State, Action>({
  initialState,
  reducer,
}: StoreProps<State, Action>): Store<State, Action> {
  let state = initialState;
  let listeners: any[] = [];
  return {
    subscribe(listener: any) {
      listeners = [...listeners, listener];
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    getSnapshot() {
      return state;
    },
    state,
    async dispatch(a: Action) {
      const copy = JSON.parse(JSON.stringify(state));
      const effect = reducer(copy, a);
      state = copy;
      console.log(state);
      for (let listener of listeners) {
        listener();
      }
      if (typeof effect === "function") {
        const action = await effect();
        if (action) this.dispatch(action);
      }
    },
  };
}
