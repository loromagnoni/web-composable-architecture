import { useRef } from "react";
import EnvironmentProvider from "./EnvironmentProvider";
import StoreProvider from "./StoreProvider";

export const createModule = ({ View, defaultStore }: any): React.FC<any> => {
  return ({ environment, store }: any) => {
    const storeRef = useRef(
      store ? store : defaultStore ? defaultStore.create(environment) : {}
    );
    return (
      <StoreProvider store={storeRef.current}>
        <EnvironmentProvider environment={environment}>
          <View />
        </EnvironmentProvider>
      </StoreProvider>
    );
  };
};
