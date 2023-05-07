import { useContext, useSyncExternalStore } from "react";
import { StoreContext } from "./StoreProvider";

export const useStore = () => {
  const store = useContext(StoreContext);
  const state = useSyncExternalStore(store.subscribe, store.getState);
  return { state, dispatch: store.send, ...store.compose };
};
