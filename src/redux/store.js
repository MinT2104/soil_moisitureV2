import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import persistedReducer from "./rootReducer";

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
const persistor = persistStore(store);

export { store, persistor };
