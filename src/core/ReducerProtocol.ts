export type ReducerFunction<State, Action> = (
  state: State,
  action: Action
) => void | CallableFunction;

abstract class ReducerProtocol<StateType, ActionType> {
  abstract initialState: StateType;
  abstract reducer: ReducerFunction<StateType, ActionType>;
}

export default ReducerProtocol;
