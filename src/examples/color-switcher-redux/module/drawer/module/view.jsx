import { useEnvironment } from "@/tyca/react/useEnvironment";
import { useReduxStore } from "@/tyca/redux/useReduxStore";
import CloseIcon from "./assets/CloseIcon";
import DropdownIcon from "./assets/DropdownIcon";
import { ColorDropDownModule } from "./color-dropdown/module";
import ProfileSummaryModule from "./profile-summary/module";
import style from "./style.module.css";

export default function Drawer() {
  const store = useReduxStore();
  const environment = useEnvironment();
  const { UI } = useEnvironment();
  return (
    <div className={style.wrapper}>
      {!store.state.root.isOpen && (
        <div className={style.openButtonWrapper}>
          <UI.ButtonIcon
            onClick={() => store.dispatch.root.didTapOpenButton()}
            Icon={DropdownIcon}
            className={style.openButton}
          />
        </div>
      )}
      {store.state.root.isOpen && (
        <div className={style.drawer}>
          <div className={style.closeButtonWrapper}>
            <UI.ButtonIcon
              onClick={() => store.dispatch.root.didTapCloseButton()}
              Icon={CloseIcon}
              className={style.closeButton}
            />
          </div>
          <ProfileSummaryModule
            environment={{
              userRepository: environment.userRepository,
              UI: environment.UI,
            }}
            module={store.profileSummary}
          />
          <ColorDropDownModule
            environment={{
              colors: environment.colors,
              UI: environment.UI,
            }}
            module={store.colorDropdown}
          />
        </div>
      )}
    </div>
  );
}
