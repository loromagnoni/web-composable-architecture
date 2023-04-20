type ActionHandler<TState> = (state: TState) => void;
type SubReducer<TState> = {
  selector: (state: TState) => any;
  reducer: Reducer<TState>;
};

type Reducer<TState> = Record<
  string,
  ActionHandler<TState> | SubReducer<TState>
>;

type Module<TState> = {
  initialState: () => TState;
  reducer: Reducer<TState>;
};

type DefinitionWithArg<TState> = (arg: any) => Module<TState>;
type DefinitionWithoutArg<TState> = () => Module<TState>;

type DefinitionFunction<TState> =
  | DefinitionWithArg<TState>
  | DefinitionWithoutArg<TState>;

type ModuleDefinition<T> = {
  composable: T;
  create: any;
};

export type DefineModule = <TState, T extends DefinitionFunction<TState>>(
  creator: T
) => ModuleDefinition<typeof creator>;
