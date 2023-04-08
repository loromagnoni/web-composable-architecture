export type Module<State, Action extends readonly any[]> = {
  initialState: () => State;
  action: Action;
  reducer: (s: State, a: Action[number]) => void;
};

type Props<State, Action extends Readonly<any[]>> = {
  initialState: () => State;
  action: Action;
  reducer: (s: State, a: Action[number]) => void;
};

export function createModule<State, Action extends readonly any[]>({
  initialState,
  action,
  reducer,
}: Props<State, Action>): Module<State, Action> {
  return { initialState, action, reducer };
}
