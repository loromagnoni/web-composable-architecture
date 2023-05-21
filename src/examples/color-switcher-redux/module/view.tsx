import { useEnvironment } from "@/tyca/react/useEnvironment";
import { useReduxStore } from "@/tyca/redux/useReduxStore";
import DrawerModule from "./drawer/module";
import MainPanelModule from "./main-panel/module";

export default function ColorSwitcher() {
  const store = useReduxStore();
  const environment = useEnvironment();
  return (
    <>
      <div style={{ position: "relative", height: "100%" }}>
        <div style={{ position: "absolute", height: "100%" }}>
          <DrawerModule
            module={store}
            environment={{
              userRepository: environment.userRepository,
              colors: environment.colors,
              UI: environment.UI,
            }}
          />
        </div>
        <MainPanelModule
          environment={{
            color: store.state.colorDropdown.selected,
            UI: environment.UI,
          }}
        />
      </div>
    </>
  );
}
