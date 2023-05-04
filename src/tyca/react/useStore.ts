import { useContext, useSyncExternalStore } from "react";
import { StoreContext } from "./StoreProvider";

export const useStore = () => {
  const module = useContext(StoreContext);
  const state = useSyncExternalStore(module.subscribe, module.getState);
  return [state, module.send];
};
