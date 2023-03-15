import produce, { current } from "immer";
import { none } from "./none";

const run = (reducer: any, state: any, action: any): any => {
  let effect = none();

  const nextState = produce(state, (draft: any) => {
    effect = reducer(draft, action) || none();
  });

  return [nextState, effect];
};

export const scope = (reducer: any, selector: any): any => {
  return (state: any, action: any) => {
    const fixedState = current(state);
    const localState = selector.toLocalState(fixedState);
    const [newLocalState, effect] = run(reducer, localState, action);
    selector.mergeInGlobalState(state, newLocalState);
    return effect;
  };
};
