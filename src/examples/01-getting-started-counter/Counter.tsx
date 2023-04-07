import { useStore } from "../../tyca/react/useStore";
import CounterView from "./View";
import { logic } from "./logic";

export default function Counter() {
  const store = useStore(logic);
  return <CounterView store={store} />;
}
