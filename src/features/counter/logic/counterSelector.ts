export const counterSelector = {
  toLocalState: (state: any) => {
    return {
      managed: state.counter,
      hasLoadedPokemonList: state.apiClientState.allIDs !== undefined,
      pokemonIDs: state.apiClientState.allIDs || [],
    };
  },
  mergeInGlobalState: (globalState: any, localState: any) => {
    globalState.counter = localState.managed;
  },
};
