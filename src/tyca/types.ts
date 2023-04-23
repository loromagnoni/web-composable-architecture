interface ActionHandler<TState> {
  (state: TState): void;
}

type InferSubState<TState> = TState extends Record<any, infer TValue>
  ? TValue
  : never;

interface SubReducer<TState, TSubState = InferSubState<TState>> {
  selector: (s: TState) => TSubState;
  reducer: Reducer<TSubState>;
}

interface Reducer<TState> {
  [K: string]: ActionHandler<TState> | SubReducer<TState>;
}

interface Module<TState> {
  initialState: () => TState;
  reducer: Reducer<TState>;
}

interface DefinitionWithEnvironment<TState, TEnv> {
  composable: (arg: TEnv) => Module<TState>;
  create: any;
}

export interface DefineModule {
  <TState, TEnv = void>(
    creator: (env: TEnv) => Module<TState>
  ): DefinitionWithEnvironment<TState, TEnv>;
}
