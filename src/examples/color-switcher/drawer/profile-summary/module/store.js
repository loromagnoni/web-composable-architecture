import { createStore } from "../../../../../tyca/module";

export default createStore(({ userRepository }) => ({
  state: {
    name: null,
    isLoading: false,
  },
  reducer: {
    onModuleInit: (state) => {
      state.isLoading = true;
      return async (dispatch) => {
        const user = await userRepository.getUser();
        dispatch.handleUserResponse(user);
      };
    },
    handleUserResponse: (state, { name }) => {
      state.isLoading = false;
      state.name = name;
    },
  },
}));
