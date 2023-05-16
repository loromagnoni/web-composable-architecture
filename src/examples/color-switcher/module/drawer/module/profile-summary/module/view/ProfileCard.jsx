import { useEnvironment } from "@/tyca/react/useEnvironment";
import { useStore } from "@/tyca/react/useStore";
import style from "./style.module.css";

export default function ProfileCard() {
  const { UI } = useEnvironment();
  const {
    state: { user },
  } = useStore();
  return (
    <div className={style["profile-card"]}>
      <UI.Avatar src={user.avatarSrc} />
      <UI.TextHeading content={user.name} level={3} />
      <UI.TextLabel content={user.email} />
    </div>
  );
}
