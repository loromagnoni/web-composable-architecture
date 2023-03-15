export type Pokemon = {
  name: string;
  image: string;
};

export interface APIClient {
  loadPokemon: (name: string) => Promise<boolean>;
  loadAllPokemonIDs: () => Promise<boolean>;
}
