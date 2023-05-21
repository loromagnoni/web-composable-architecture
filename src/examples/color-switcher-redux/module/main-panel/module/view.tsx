import { useEnvironment } from "@/tyca/react/useEnvironment";
import style from "./styles.module.css";
export default function MainPanel() {
  const { color, UI } = useEnvironment();
  return (
    <div
      className={style["main-panel"]}
      style={{
        backgroundColor: color.value,
      }}
    >
      <UI.TextHeading content="Main Panel" level={1} />
    </div>
  );
}
