import { createContext } from "react";

export const StoreContext = createContext({} as any);

export default function StoreProvider({ store, children }: any) {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
