import { StoreOf } from "../../tyca/react/useStore";
import { logic } from "./logic";

type CounterViewProps = {
  store: StoreOf<typeof logic>;
};

export default function CounterView({ store }: CounterViewProps) {
  const [state, dispatch] = store;
  return (
    <div>
      <button onClick={() => dispatch("incrementButtonTapped")}></button>
      {state.count}
      <button onClick={() => dispatch("decrementButtonTapped")}></button>
    </div>
  );
}
