import { useSyncExternalStore } from "react";

export default function useStore(featureStore: any) {
  const state = useSyncExternalStore(
    featureStore.subscribe,
    featureStore.getSnapshot
  );
  return {
    dispatch: featureStore.dispatch,
    state,
  };
}
