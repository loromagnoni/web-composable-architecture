import { useSyncExternalStore } from "react";
import { store } from "./store";

export default function useStore(selector: any) {
  const state = useSyncExternalStore(
    store.subscribe,
    selector.toLocalState(store.getSnapshot)
  );
  return {
    //TODO: scope dispatch
    dispatch: store.dispatch,
    state,
  };
}
