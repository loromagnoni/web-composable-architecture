import { none } from "./none";

export const combine =
  (...reducers: any[]): any =>
  (dispatch: any) => {
    return (state: any, action: any) => {
      const allEffects = reducers.map((reducer) => {
        return reducer(state, action) || none();
      });
      const promises = allEffects.map((effect) => effect(dispatch));
      Promise.all(promises);
    };
  };
