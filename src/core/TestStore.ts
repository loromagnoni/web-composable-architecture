import createStore from "./Store";

export default function cresteTestStore(feature: any) {
  const store = createStore({
    initialState: feature.initialState,
    reducer: feature.reducer,
  });
}
