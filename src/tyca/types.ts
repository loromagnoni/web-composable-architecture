interface ActionHandler<TState> {
  (state: TState): void;
}

interface SubReducer<TState, TSubState> {
  selector: (s: TState) => TSubState;
  reducer: Reducer<TSubState>;
}

type SubReducers<TState> = {
  [K in keyof TState as string]: SubReducer<TState, TState[K]>;
};

type ActionHandlers<TState> = Record<string, ActionHandler<TState>>;

export type Reducer<TState> = ActionHandlers<TState>;
type Compose<TState> = Partial<SubReducers<TState>>;

export interface ModuleRequirements<TState> {
  initialState: () => TState;
  reducer?: Reducer<TState>;
  compose?: Compose<TState>;
}

export interface Module<TState> {
  initialState: () => TState;
  reducer: Reducer<TState>;
  compose?: Compose<TState>;
}

interface DefinitionWithEnvironment<TState, TEnv> {
  composable: (arg: TEnv) => Module<TState>;
  create: any;
}

export interface DefineModule {
  <TState, TEnv = void>(
    creator: (env: TEnv) => ModuleRequirements<TState>
  ): DefinitionWithEnvironment<TState, TEnv>;
}
