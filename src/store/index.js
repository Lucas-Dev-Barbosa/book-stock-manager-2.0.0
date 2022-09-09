import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootSaga from "./saga/saga";
import appReducer, { migrations } from "./modules/reducer";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const persistedReducer = persistReducer(
  { key: "root", storage: storage, migrate: createMigrate(migrations) },
  appReducer.reducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
