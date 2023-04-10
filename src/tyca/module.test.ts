import { expect, it } from "vitest";
import { combine, defineModule } from "./module";
import { counter } from "../examples/01-getting-started-counter/logic";

it("should create module", () => {
  const module = defineModule(() => ({
    initialState: () => ({}),
    reducer: {},
  }));
  expect(module.create).toBeTypeOf("function");
  const instance = module.create();
  expect(instance).toBeDefined();
});

it("module state should be a copy of the the initial one", () => {
  const state = { count: 0 };
  const module = defineModule(() => ({
    initialState: () => state,
    reducer: {},
  }));
  const instance = module.create();
  expect(instance.getState()).toStrictEqual(state);
  expect(instance.getState()).not.toBe(state);
});

it("module can send reducer actions", () => {
  const state = { count: 0 };
  const module = defineModule(() => ({
    initialState: () => state,
    reducer: {
      didTapIncrementButton: (state: any) => {
        state.count++;
      },
    },
  }));
  const instance = module.create();
  expect(typeof instance.send.didTapIncrementButton).toBe("function");
  instance.send.didTapIncrementButton();
  expect(instance.getState()).toStrictEqual({ count: 1 });
});

it("module state instance don't change", () => {
  const state = { count: 0 };
  const module = defineModule(() => ({
    initialState: () => state,
    reducer: {
      didTapIncrementButton: (state: any) => {
        state.count++;
      },
    },
  }));
  const instance = module.create();
  const firstState = instance.getState();
  const secondState = instance.getState();
  expect(firstState).toBe(secondState);
});

it("module state instance change on update", () => {
  const state = { count: 0 };
  const module = defineModule(() => ({
    initialState: () => state,
    reducer: {
      didTapDecrementButton: (state: any) => {
        state.count--;
      },
      didTapIncrementButton: (state: any) => {
        state.count++;
      },
    },
  }));
  const instance = module.create();
  const firstState = instance.getState();
  instance.send.didTapIncrementButton();
  instance.send.didTapDecrementButton();
  const secondState = instance.getState();
  expect(firstState).toStrictEqual(secondState);
  expect(firstState).not.toBe(secondState);
});

it("module can be composed", () => {
  const counterCreator = defineModule(() => ({
    initialState: () => ({ count: 0 }),
    reducer: {
      didTapIncrementButton: (state: any) => {
        state.count++;
      },
      didTapDecrementButton: (state: any) => {
        state.count--;
      },
    },
  }));

  const composedModule = defineModule(() => {
    const firstCounter = counterCreator.composable();
    const secondCounter = counterCreator.composable();
    return {
      initialState: () => ({
        firstCounter: firstCounter.initialState(),
        secondCounter: secondCounter.initialState(),
      }),
      reducer: {
        firstCounter: {
          selector: (state: any) => state.firstCounter,
          reducer: firstCounter.reducer,
        },
        secondCounter: {
          selector: (state: any) => state.secondCounter,
          reducer: secondCounter.reducer,
        },
      },
    };
  });
  const instance = composedModule.create();
  expect(instance.getState()).toStrictEqual({
    firstCounter: { count: 0 },
    secondCounter: { count: 0 },
  });
  instance.send.firstCounter.didTapIncrementButton();
  instance.send.firstCounter.didTapIncrementButton();
  instance.send.firstCounter.didTapDecrementButton();
  instance.send.secondCounter.didTapDecrementButton();
  expect(instance.getState()).toStrictEqual({
    firstCounter: { count: 1 },
    secondCounter: { count: -1 },
  });
});

it("modules can be composed using combine API", () => {
  const counter = defineModule(() => ({
    initialState: () => ({ count: 0 }),
    reducer: {
      didTapIncrementButton: (state: any) => {
        state.count++;
      },
      didTapDecrementButton: (state: any) => {
        state.count--;
      },
    },
  }));

  const composedModule = combine({
    firstCounter: counter.composable(),
    secondCounter: counter.composable(),
  });
  const instance = composedModule.create();
  expect(instance.getState()).toStrictEqual({
    firstCounter: { count: 0 },
    secondCounter: { count: 0 },
  });
  instance.send.firstCounter.didTapIncrementButton();
  instance.send.firstCounter.didTapIncrementButton();
  instance.send.firstCounter.didTapDecrementButton();
  instance.send.secondCounter.didTapDecrementButton();
  expect(instance.getState()).toStrictEqual({
    firstCounter: { count: 1 },
    secondCounter: { count: -1 },
  });
});
