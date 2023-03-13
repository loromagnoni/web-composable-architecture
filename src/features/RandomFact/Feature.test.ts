import { expect, it } from "vitest";
import { action } from "../../core/dispatchAction";
import createStore from "../../core/Store";
import Feature from "./Feature";

it("Should increment state", async () => {
  const feature = new Feature(async () => "fact");
  const store = createStore({
    initialState: feature.initialState,
    reducer: feature.reducer,
  });
  store.dispatch(action("incrementButtonTapped"));
  expect(store.getSnapshot().count).toBe(1);
});

it("Should decrement state", async () => {
  const feature = new Feature(async () => "fact");
  const store = createStore({
    initialState: feature.initialState,
    reducer: feature.reducer,
  });
  store.dispatch(action("decrementButtonTapped"));
  expect(store.getSnapshot().count).toBe(-1);
});

it("should receive fact", () => {
  const feature = new Feature(async () => "fact");
  const store = createStore({
    initialState: feature.initialState,
    reducer: feature.reducer,
  });
  store.dispatch(action("numberFactButtonTapped"));
  expect(store.getSnapshot().count).toBe(-1);
});
