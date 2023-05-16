import { createStore } from "@/tyca/module";

export default createStore(({ userRepository }) => ({
  state: {
    user: {
      name: null,
      email: null,
      avatarSrc: null,
    },
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
    handleUserResponse: (state, user) => {
      state.isLoading = false;
      state.user = user;
    },
  },
}));
