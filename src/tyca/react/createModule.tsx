import { useMemo, useRef } from "react";
import StoreProvider from "./StoreProvider";

export const createModule = ({ View, store }: any): React.FC<any> => {
  return ({ environment }: any) => {
    const storeRef = useRef(store.create(environment));
    return (
      <StoreProvider store={storeRef.current}>
        <View />
      </StoreProvider>
    );
  };
};
