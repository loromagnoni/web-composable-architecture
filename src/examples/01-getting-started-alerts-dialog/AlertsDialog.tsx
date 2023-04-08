import { useStore } from "../../tyca/react/useStore";
import View from "./View";
import { logic } from "./logic";

export default function AlertsDialog() {
  const store = useStore(logic);
  return <View store={store} />;
}
