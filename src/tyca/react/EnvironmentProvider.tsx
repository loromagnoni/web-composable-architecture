import { createContext } from "react";

export const EnvironmentContext = createContext({} as any);

export default function EnvironmentProvider({ environment, children }: any) {
  return (
    <EnvironmentContext.Provider value={environment}>
      {children}
    </EnvironmentContext.Provider>
  );
}
