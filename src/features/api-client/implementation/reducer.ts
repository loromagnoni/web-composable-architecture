import { none } from "../../../core/none";
import { Pokemon } from "../interface";

export type APIClientState = {
  allIDs?: string[];
  pokemons: { [key: string]: Pokemon };
};

//Question: so dependencies can have state?
export type APIClientAction =
  | { type: "ALL_IDS_RESPONSE_RECEIVED"; payload: string[] }
  | { type: "POKEMON_RESPONSE_RECEIVED"; payload: Pokemon };

export const apiClientInitialState = (): APIClientState => {
  return {
    allIDs: undefined,
    pokemons: {},
  };
};

export const apiClientReducer = (): any => {
  return (state: any, action: any) => {
    switch (action.type) {
      case "ALL_IDS_RESPONSE_RECEIVED":
        state.allIDs = action.payload;
        return none();

      case "POKEMON_RESPONSE_RECEIVED":
        state.pokemons[action.payload.name] = action.payload;
        return none();
    }
  };
};
