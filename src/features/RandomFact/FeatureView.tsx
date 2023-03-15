import { action } from "../../core/dispatchAction";
import { StoreOf } from "../../core/store";
import Feature from "./Feature";

type FeatureViewProps = {
  store: StoreOf<Feature>;
};

export default function FeatureView({ store }: FeatureViewProps) {
  return (
    <div>
      <button
        onClick={() => store.dispatch(action("incrementButtonTapped") as any)}
      >
        +
      </button>
      {store.state.count}
      <button
        onClick={() => store.dispatch(action("decrementButtonTapped") as any)}
      >
        -
      </button>
      <button onClick={() => store.dispatch(action("numberFactButtonTapped"))}>
        Get fact
      </button>
      {store.state.numberFactAlert && (
        <div>Fact is: {store.state.numberFactAlert}</div>
      )}
    </div>
  );
}
