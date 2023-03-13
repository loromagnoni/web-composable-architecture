import createStore from "./core/Store";
import useStore from "./core/useStore";
import Feature from "./features/RandomFact/Feature";
import FeatureView from "./features/RandomFact/FeatureView";

const feature = new Feature(
  async () =>
    await fetch(`http://numbersapi.com/${state.count}/trivia`).then((d) =>
      d.text()
    )
);
const featureStore = createStore({
  initialState: feature.initialState,
  reducer: feature.reducer,
});

function App() {
  const store = useStore(featureStore);
  return (
    <div>
      App
      <div>
        <FeatureView store={store as any} />
      </div>
    </div>
  );
}

export default App;
