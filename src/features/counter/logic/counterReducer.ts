import { none } from "../../../core/none";
import { APIClient } from "../../api-client/interface";

export type ManagedCounterState = {
  counter: number;
};

export type CounterState = {
  managed: ManagedCounterState;
  readonly hasLoadedPokemonList: boolean;
  readonly pokemonIDs: string[];
};

export type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET_TO_ZERO" };

export const counterInitialState = (): ManagedCounterState => {
  return {
    counter: 0,
  };
};

export const counterReducer = (apiClient: APIClient): any => {
  return (state: any, action: any) => {
    switch (action.type) {
      case "DECREMENT":
        state.managed.counter = state.managed.counter - 1;
        const counter = state.managed.counter;
        return async (dispatch: any) => {
          if (counter < 0) {
            await new Promise((r) => setTimeout(r, 200));
            dispatch({ type: "SET_TO_ZERO" });
          }
        };

      case "INCREMENT":
        state.managed.counter += 1;
        const next = state.pokemonIDs[state.managed.counter - 1];
        return async () => {
          await apiClient.loadPokemon(next);
        };

      case "SET_TO_ZERO":
        state.managed.counter = Math.max(state.managed.counter, 0);
        return none();
    }
  };
};
