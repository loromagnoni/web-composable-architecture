export type Module<State, Action> = {
  initialState: () => State;
  action: Action;
  reducer: () => (s: State, a: Action) => any;
};

type Props<State, Action extends Readonly<any[]>> = {
  initialState: () => State;
  action: Action;
  reducer: () => (s: State, a: Action[number]) => void;
};

export function createModule<State, Action extends Readonly<any[]>>({
  initialState,
  action,
  reducer,
}: Props<State, Action>): Module<State, Action> {
  return { initialState, action, reducer };
}
