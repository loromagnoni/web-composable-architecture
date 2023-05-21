import { useEnvironment } from "@/tyca/react/useEnvironment";
import style from "./style.module.css";
import { useReduxStore } from "@/tyca/redux/useReduxStore";

export default function ProfileCard() {
  const { UI } = useEnvironment();
  const {
    state: { user },
  } = useReduxStore();
  return (
    <div className={style["profile-card"]}>
      <UI.Avatar src={user.avatarSrc} />
      <UI.TextHeading content={user.name} level={3} />
      <UI.TextLabel content={user.email} />
    </div>
  );
}
