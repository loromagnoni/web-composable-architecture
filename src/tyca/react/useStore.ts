import { useImmer } from "use-immer";
import { Module } from "../module";

type UseStore = <State, Action extends readonly any[]>(
  module: Module<State, Action>
) => readonly [State, (action: Action[number]) => void];

export type StoreOf<T> = T extends Module<infer State, infer Action>
  ? readonly [State, (action: Action[number]) => void]
  : never;

export const useStore: UseStore = (module) => {
  const [state, setState] = useImmer(module.initialState());
  const reducer = module.reducer();
  const dispatch = (action: any) => {
    setState((draft: any) => {
      reducer(draft, action);
    });
  };
  return [state, dispatch] as const;
};
