import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state

interface IUserProfile {
  givenName: String;
  surname: String;
}
interface IAuth {
  userProfile: IUserProfile;
  isAuthenticated: boolean;
}

const initialState: IAuth = {
  isAuthenticated: false,
  userProfile: { givenName: "", surname: "" },
};

const AuthSlice = createSlice({
  name: "OrderDetails",
  initialState: initialState,
  reducers: {
    setUserAuthenticated: (state, action: PayloadAction<IAuth>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userProfile = action.payload.userProfile;
    },
  },
});

const AuthReducer = AuthSlice.reducer;
const AuthActions = AuthSlice.actions;
export { AuthReducer, AuthActions };
