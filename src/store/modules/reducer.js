import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  token: null,
  roles: [],
  signed: false,
  loading: false,
  messageError: null,
};

const slice = createSlice({
  name: "app",
  initialState: INITIAL_STATE,
  reducers: {
    signInRequest: (state) => {
      state.loading = true;
      return state;
    },
    signInSuccess: (state, action) => {
      state.token = action.payload.token;
      state.roles = action.payload.roles;
      state.signed = true;
      state.loading = false;
      state.messageError = null;

      return state;
    },
    signInFailure: (state, action) => {
      return { ...INITIAL_STATE, messageError: action.payload.messageError };
    },
    signInOut: () => {
      return INITIAL_STATE;
    },
  },
});

export default slice;
