import useStore from "../../tyca/react/useStore";
import CounterView from "./View";
import { logic } from "./logic";

export default function Counter() {
  const store = useStore({
    initialState: logic.initialState(),
    reducer: logic.reducer(),
  });
  console.log("rendered counter");
  return <CounterView store={store} />;
}
