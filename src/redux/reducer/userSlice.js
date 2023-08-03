import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { createSlice } from "@reduxjs/toolkit";
import apiProjectService from "../../services/ApiProjectService";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    logout: () => {
      return null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return async (dispatch) => {
    try {
      const result = await signInWithPopup(auth, provider);
      apiProjectService
        .post("/user/getauser", {
          uid: result.user.uid,
        })
        .then((res) => dispatch(login(res.data)))
        .catch((err) =>
          apiProjectService
            .post(`user/add`, {
              username: result.user.displayName,
              multiProject: [],
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
              phoneNumber: result.user.phoneNumber,
              accessToken: result.user.accessToken,
              isActive: true,
              createdAt: Date(),
              projectAmount: 0,
              espAmount: 0,
              pumpAmount: 0,
            })
            .then((res) => {
              dispatch(login(res.data));
            })
            .catch((error) => {
              console.log(error);
            })
        );
    } catch (error) {
      console.log(error);
    }
  };
};
export const logoutGoogle = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
};
