export const apiClientSelector = {
  toLocalState: (state: any) => {
    return state.apiClientState;
  },
  mergeInGlobalState: (globalState: any, localState: any) => {
    globalState.apiClientState = localState;
  },
};
