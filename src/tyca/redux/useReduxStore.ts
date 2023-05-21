import { useContext, useSyncExternalStore } from "react";
import { ReduxStoreContext } from "./ReduxStoreProvider";

export const useReduxStore = () => {
  const { store, dispatch, submodules } = useContext(ReduxStoreContext);
  const state = useSyncExternalStore(store.subscribe, store.getState);
  return { store, state, dispatch, ...submodules, submodules };
};
