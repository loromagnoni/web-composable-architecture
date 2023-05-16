import { useStore } from "@/tyca/react/useStore";
import MainPanel from "./main-panel/module/view";
import { useEnvironment } from "@/tyca/react/useEnvironment";
import DrawerModule from "./drawer/module";
import MainPanelModule from "./main-panel/module";

export default function ColorSwitcher() {
  const store = useStore();
  const environment = useEnvironment();
  return (
    <>
      Color Switcher Example
      <div style={{ position: "relative", height: "100%" }}>
        <div style={{ position: "absolute", height: "100%" }}>
          <DrawerModule
            store={store.drawer}
            environment={{
              userRepository: environment.userRepository,
              colors: environment.colors,
              UI: environment.UI,
            }}
          />
        </div>

        <MainPanelModule
          environment={{
            color: store.state.drawer.colorDropdown.selected,
            UI: environment.UI,
          }}
        />
      </div>
    </>
  );
}
