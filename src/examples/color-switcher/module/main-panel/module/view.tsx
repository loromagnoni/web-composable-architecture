import { useEnvironment } from "@/tyca/react/useEnvironment";

export default function MainPanel() {
  const environment = useEnvironment();
  return (
    <div
      style={{
        backgroundColor: environment.color.value,
      }}
    >
      <h1>Main Panel</h1>
    </div>
  );
}
