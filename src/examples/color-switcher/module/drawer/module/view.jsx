import { useEnvironment } from "@/tyca/react/useEnvironment";
import { useStore } from "@/tyca/react/useStore";
import { ColorDropDownModule } from "./color-dropdown/module";
import ProfileSummaryModule from "./profile-summary/module";

export default function Drawer() {
  const store = useStore();
  const environment = useEnvironment();
  return (
    <div>
      <div>
        <button onClick={store.dispatch.didTapIcon}>Toggle</button>
      </div>
      {store.state.isOpen && (
        <div>
          <ProfileSummaryModule
            environment={{
              userRepository: environment.userRepository,
            }}
            store={store.profileSummary}
          />
          <ColorDropDownModule
            environment={{
              colors: environment.colors,
            }}
            store={store.colorDropdown}
          />
        </div>
      )}
    </div>
  );
}
