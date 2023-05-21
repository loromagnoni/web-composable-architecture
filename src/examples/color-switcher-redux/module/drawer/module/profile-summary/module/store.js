import withEffect from "@/tyca/redux/withEffect";
import { createSlice } from "@reduxjs/toolkit";

export default ({ userRepository }) => {
  return createSlice({
    name: "profileSummary",
    initialState: {
      user: null,
      isLoading: false,
    },
    reducers: {
      onModuleInit: withEffect((state) => {
        state.isLoading = true;
        return async (dispatch) => {
          const user = await userRepository.getUser();
          dispatch.handleUserResponse(user);
        };
      }),
      handleUserResponse: (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      },
    },
  });
};
