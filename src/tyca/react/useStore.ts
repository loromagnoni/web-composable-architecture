import { useContext, useSyncExternalStore } from "react";
import { ModuleContext } from "./ModuleContext";

export const useStore = () => {
  const module = useContext(ModuleContext);
  const state = useSyncExternalStore(module.subscribe, module.getState);
  return [state, module.send];
};
