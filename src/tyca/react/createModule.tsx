import { useMemo, useRef } from "react";
import StoreProvider from "./StoreProvider";
import EnvironmentProvider from "./EnvironmentProvider";

export const createModule = ({ View, defaultStore }: any): React.FC<any> => {
  return ({ environment, store }: any) => {
    const storeRef = useRef(store ? store : defaultStore.create(environment));
    return (
      <StoreProvider store={storeRef.current}>
        <EnvironmentProvider environment={environment}>
          <View />
        </EnvironmentProvider>
      </StoreProvider>
    );
  };
};
