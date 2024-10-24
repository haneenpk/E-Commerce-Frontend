import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import userReducer from "./slices/userSlice"; // Import resetUserState action
import commonSlice from "./slices/commonSlice";

// Combine reducers
const rootReducer = combineReducers({
  admin: adminReducer,
  user: userReducer,
  common: commonSlice,
});

// Reset root reducer state to initial state
export const resetRootReducer = () => {
  return {
    admin: adminReducer(undefined, {}),
    user: userReducer(undefined, {}),
    common: commonSlice(undefined, {}),
  };
};

export default rootReducer;