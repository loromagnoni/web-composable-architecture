import { useEnvironment } from "@/tyca/react/useEnvironment";
import { useStore } from "@/tyca/react/useStore";
import { ColorDropDownModule } from "./color-dropdown/module";
import ProfileSummaryModule from "./profile-summary/module";

export default function Drawer() {
  const [state, dispatch] = useStore();
  const environment = useEnvironment();
  return (
    <div>
      <div>
        <button onClick={dispatch.didTapIcon}>Toggle</button>
      </div>
      {state.isOpen && (
        <div>
          <ProfileSummaryModule
            environment={{
              userRepository: environment.userRepository,
            }}
          />
          <ColorDropDownModule
            environment={{
              colors: environment.colors,
            }}
          />
        </div>
      )}
    </div>
  );
}
