import createStore from "./core/Store";
import useStore from "./core/useStore";
import Feature from "./features/RandomFact/Feature";
import FeatureView from "./features/RandomFact/FeatureView";

const feature = new Feature();
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
