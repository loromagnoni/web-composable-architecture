import { createContext } from "react";

export const ReduxStoreContext = createContext({} as any);

export default function ReduxStoreProvider({ store, children }: any) {
  return (
    <ReduxStoreContext.Provider value={store}>
      {children}
    </ReduxStoreContext.Provider>
  );
}
