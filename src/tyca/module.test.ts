import { expect, it } from "vitest";
import { combine, defineModule } from "./module";
import { counter } from "../examples/01-getting-started-counter/logic";
import { current } from "immer";

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
    firstCounter: counter,
    secondCounter: counter,
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

it("module cannot access other module state", () => {
  const stateCollector: any[] = [];
  const counter = defineModule(() => ({
    initialState: () => ({ count: 0 }),
    reducer: {
      didTapIncrementButton: (state: any) => {
        state.count++;
        stateCollector.push(current(state));
      },
    },
  }));
  const composedModule = combine({
    firstCounter: counter,
    secondCounter: counter,
  });
  const instance = composedModule.create();
  instance.send.firstCounter.didTapIncrementButton();
  instance.send.secondCounter.didTapIncrementButton();
  expect(stateCollector).toStrictEqual([{ count: 1 }, { count: 1 }]);
});

it("module can be composed recursively", () => {
  const stateCollector: any[] = [];
  const counter = defineModule(() => ({
    initialState: () => ({ count: 0 }),
    reducer: {
      didTapIncrementButton: (state: any) => {
        state.count++;
        stateCollector.push(current(state));
      },
    },
  }));
  const couple = combine({
    firstCounter: counter,
    secondCounter: counter,
  });
  const composed = combine({
    firstCouple: couple,
    secondCouple: couple,
  });
  const instance = composed.create();
  instance.send.firstCouple.firstCounter.didTapIncrementButton();
  instance.send.secondCouple.firstCounter.didTapIncrementButton();
  expect(instance.getState()).toStrictEqual({
    firstCouple: {
      firstCounter: { count: 1 },
      secondCounter: { count: 0 },
    },
    secondCouple: {
      firstCounter: { count: 1 },
      secondCounter: { count: 0 },
    },
  });
});

type CounterEnvironment = {
  amountProvider: {
    getAmount(): number;
  };
};

it("module can require dependencies", () => {
  const provider = {
    getAmount() {
      return 2;
    },
  };
  const counter = defineModule(({ amountProvider }: CounterEnvironment) => ({
    initialState: () => ({ count: 0 }),
    reducer: {
      didTapIncrementButton: (state: any) => {
        state.count += amountProvider.getAmount();
      },
    },
  }));
  const instance = counter.create({ amountProvider: provider });
  instance.send.didTapIncrementButton();
  expect(instance.getState()).toStrictEqual({ count: 2 });
});

it("should throw error if dependencies are not found", () => {
  const counter = defineModule(({ amountProvider }: CounterEnvironment) => ({
    initialState: () => ({ count: 0 }),
    reducer: {
      didTapIncrementButton: (state: any) => {
        state.count += amountProvider.getAmount();
      },
    },
  }));
  expect(counter.create).toThrowError();
});

it("composed module dependencies are merged", () => {
  const amountProvider = {
    getAmount() {
      return 2;
    },
  };
  const oddAmountProvider = {
    getAmount() {
      return 5;
    },
  };
  const counterCreator = defineModule(({ amountProvider }: any) => ({
    initialState: () => ({ count: 0 }),
    reducer: {
      didTapIncrementButton: (state: any) => {
        state.count += amountProvider.getAmount();
      },
    },
  }));
  const oddCounterCreator = defineModule(
    ({ amountProvider, oddAmountProvider }: any) => ({
      initialState: () => ({ count: oddAmountProvider.getAmount() }),
      reducer: {
        didTapIncrementButton: (state: any) => {
          state.count +=
            state % 2 === 0
              ? amountProvider.getAmount()
              : oddAmountProvider.getAmount();
        },
      },
    })
  );
  const composed = defineModule(
    ({ amountProvider, oddAmountProvider }: any) => {
      const firstCounter = counterCreator.composable({ amountProvider });
      const secondCounter = oddCounterCreator.composable({
        amountProvider,
        oddAmountProvider,
      });
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
    }
  );
  const instance = composed.create({ amountProvider, oddAmountProvider });
  instance.send.firstCounter.didTapIncrementButton();
  instance.send.secondCounter.didTapIncrementButton();
  expect(instance.getState()).toStrictEqual({
    firstCounter: { count: 2 },
    secondCounter: { count: 10 },
  });
});

it("composed module dependencies are merged using compose API", () => {
  const amountProvider = {
    getAmount() {
      return 2;
    },
  };
  const oddAmountProvider = {
    getAmount() {
      return 5;
    },
  };
  const counterCreator = defineModule(({ amountProvider }: any) => ({
    initialState: () => ({ count: 0 }),
    reducer: {
      didTapIncrementButton: (state: any) => {
        state.count += amountProvider.getAmount();
      },
    },
  }));
  const oddCounterCreator = defineModule(
    ({ amountProvider, oddAmountProvider }: any) => ({
      initialState: () => ({ count: oddAmountProvider.getAmount() }),
      reducer: {
        didTapIncrementButton: (state: any) => {
          state.count +=
            state % 2 === 0
              ? amountProvider.getAmount()
              : oddAmountProvider.getAmount();
        },
      },
    })
  );
  const composed = combine({
    firstCounter: counterCreator,
    secondCounter: oddCounterCreator,
  });
  const instance = composed.create({ amountProvider, oddAmountProvider });
  instance.send.firstCounter.didTapIncrementButton();
  instance.send.secondCounter.didTapIncrementButton();
  expect(instance.getState()).toStrictEqual({
    firstCounter: { count: 2 },
    secondCounter: { count: 10 },
  });
});

it("dependencies are merged recursively", () => {
  const amountProvider = {
    getAmount() {
      return 2;
    },
  };
  const oddAmountProvider = {
    getAmount() {
      return 5;
    },
  };
  const counterCreator = defineModule(({ amountProvider }: any) => ({
    initialState: () => ({ count: 0 }),
    reducer: {
      didTapIncrementButton: (state: any) => {
        state.count += amountProvider.getAmount();
      },
    },
  }));
  const oddCounterCreator = defineModule(
    ({ amountProvider, oddAmountProvider }: any) => ({
      initialState: () => ({ count: oddAmountProvider.getAmount() }),
      reducer: {
        didTapIncrementButton: (state: any) => {
          state.count +=
            state % 2 === 0
              ? amountProvider.getAmount()
              : oddAmountProvider.getAmount();
        },
      },
    })
  );
  const composed = combine({
    firstCounter: counterCreator,
    secondCounter: oddCounterCreator,
  });
  const composed2 = combine({
    firstCouple: composed,
    secondCouple: composed,
  });
  const instance = composed2.create({ amountProvider, oddAmountProvider });
  instance.send.firstCouple.firstCounter.didTapIncrementButton();
  instance.send.secondCouple.secondCounter.didTapIncrementButton();
  expect(instance.getState()).toStrictEqual({
    firstCouple: {
      firstCounter: { count: 2 },
      secondCounter: { count: 5 },
    },
    secondCouple: {
      firstCounter: { count: 0 },
      secondCounter: { count: 10 },
    },
  });
});
