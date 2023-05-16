import { useEnvironment } from "@/tyca/react/useEnvironment";
import { useStore } from "@/tyca/react/useStore";
import { ColorDropDownModule } from "./color-dropdown/module";
import ProfileSummaryModule from "./profile-summary/module";
import style from "./style.module.css";
import DropdownIcon from "./assets/DropdownIcon";
import CloseIcon from "./assets/CloseIcon";

export default function Drawer() {
  const store = useStore();
  const environment = useEnvironment();
  const { UI } = useEnvironment();
  return (
    <div className={style.wrapper}>
      {!store.state.isOpen && (
        <div className={style.openButtonWrapper}>
          <UI.ButtonIcon
            onClick={store.dispatch.didTapOpenButton}
            Icon={DropdownIcon}
            className={style.openButton}
          />
        </div>
      )}
      {store.state.isOpen && (
        <div class={style.drawer}>
          <div class={style.closeButtonWrapper}>
            <UI.ButtonIcon
              onClick={store.dispatch.didTapCloseButton}
              Icon={CloseIcon}
              className={style.closeButton}
            />
          </div>

          <ProfileSummaryModule
            environment={{
              userRepository: environment.userRepository,
              UI: environment.UI,
            }}
            store={store.profileSummary}
          />
          <ColorDropDownModule
            environment={{
              colors: environment.colors,
              UI: environment.UI,
            }}
            store={store.colorDropdown}
          />
        </div>
      )}
    </div>
  );
}
