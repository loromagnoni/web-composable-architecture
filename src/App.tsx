import { combine } from "./core/combine";
import { scope } from "./core/scope";
import { createStore, store } from "./core/store";
import {
  apiClientInitialState,
  apiClientReducer,
  LiveAPIClient,
} from "./features/api-client/implementation";
import { apiClientSelector } from "./features/api-client/implementation/apiClientSelector";
import {
  Counter,
  counterInitialState,
  counterReducer,
} from "./features/counter/implementation";
import { counterSelector } from "./features/counter/logic/counterSelector";

const liveAPIClient = new LiveAPIClient();
const initialState = {
  counter: counterInitialState(),
  apiClientState: apiClientInitialState(),
};
const reducerCreator = combine(
  scope(counterReducer(liveAPIClient), counterSelector),
  scope(apiClientReducer(), apiClientSelector)
);
createStore({
  initialState,
  reducerCreator,
});
liveAPIClient.initialize(store.dispatch, () => {
  const appState = store.getSnapshot();
  return appState?.apiClientState;
});
liveAPIClient.loadAllPokemonIDs();

function App() {
  return (
    <div>
      App
      <Counter />
    </div>
  );
}

export default App;
