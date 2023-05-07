import { useStore } from "@/tyca/react/useStore";
import MainPanel from "./main-panel/module/view";
import { useEnvironment } from "@/tyca/react/useEnvironment";
import DrawerModule from "./drawer/module";
import MainPanelModule from "./main-panel/module";

export default function ColorSwitcher() {
  const store = useStore();
  const environment = useEnvironment();
  return (
    <div>
      Color Switcher Example
      <div>
        <DrawerModule
          store={store.drawer}
          environment={{
            userRepository: environment.userRepository,
            colors: environment.colors,
          }}
        />
        <MainPanelModule
          environment={{
            color: store.state.drawer.colorDropdown.selected,
          }}
        />
      </div>
    </div>
  );
}
