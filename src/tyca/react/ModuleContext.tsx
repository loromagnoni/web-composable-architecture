import { createContext } from "react";

export const ModuleContext = createContext({} as any);

export default function Module({ module, children }: any) {
  return (
    <ModuleContext.Provider value={module}>{children}</ModuleContext.Provider>
  );
}
