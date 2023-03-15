import type { APIClient, Pokemon } from "../interface";
import { APIClientState } from "./reducer";

type AllPokemonResponse = {
  results: [
    {
      name: string;
    }
  ];
};

export class LiveAPIClient implements APIClient {
  //QUESTION: is the mapping only used to cast the type?
  #dispatch?: any;
  #getState?: () => APIClientState = undefined;

  initialize(dispatch: any, getState: () => any) {
    this.#dispatch = dispatch;
    this.#getState = getState;
  }

  async loadPokemon(name: string): Promise<boolean> {
    const state = this.#getState?.();

    if (state == undefined) {
      return false;
    }

    if (state.pokemons[name] !== undefined) {
      return true;
    }

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonJson = await res.json();
    const pokemon: Pokemon = {
      name: pokemonJson.name,
      image: pokemonJson.sprites.front_default,
    };
    this.#dispatch?.({ type: "POKEMON_RESPONSE_RECEIVED", payload: pokemon });
    //QUESTION: Why return true?
    return true;
  }
  async loadAllPokemonIDs(): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 1000));
    const res = await fetch("https://pokeapi.co/api/v2/pokemon");
    const json = (await res.json()) as AllPokemonResponse;
    const list = json.results.map((item) => item.name);
    this.#dispatch?.({ type: "ALL_IDS_RESPONSE_RECEIVED", payload: list });
    return true;
  }
}
