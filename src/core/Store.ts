export let store: any;

export function createStore({ initialState, reducerCreator }: any) {
  let state = initialState;
  let listeners: any[] = [];
  store = {
    subscribe(listener: any) {
      listeners = [...listeners, listener];
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    getSnapshot() {
      return state;
    },
    async dispatch(a: any) {
      //FIXME
      reducerCreator(this.dispatch)(state, a);
      for (let listener of listeners) {
        listener();
      }
    },
  };
}
