import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import authReducer from "./reducer/userSlice";
import filterReducer from "./reducer/filterbySlice";
import maxYScaleReducer from "./reducer/maxYScaleSlice";
import currentProjectSlice from "./reducer/currentProjectSlice";
import sortReducer from "./reducer/sortSlice";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: authReducer,
  filter: filterReducer,
  maxYScale: maxYScaleReducer,
  currentProject: currentProjectSlice,
  sort: sortReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
