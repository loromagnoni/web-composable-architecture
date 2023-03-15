import useStore from "../../../core/useStore";
import { counterSelector } from "../logic/counterSelector";
import { CounterView } from "./CounterView";

export default function Counter() {
  const store = useStore(counterSelector);
  return <CounterView store={store} />;
}
