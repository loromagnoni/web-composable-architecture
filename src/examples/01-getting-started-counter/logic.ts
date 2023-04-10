import { defineModule } from "../../tyca/module";

export const counter = defineModule(() => ({
  initialState: () => ({
    count: 0,
  }),
  reducer: {
    didTapIncrementButton: (state: any) => {
      state.count++;
    },
    didTapDecrementButton: (state: any) => {
      state.count--;
    },
  },
}));
