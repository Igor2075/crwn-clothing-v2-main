import { compose, createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
// import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleWare = createSagaMiddleware();

const persistConfig: ExtendedPersistConfig = { key: "root", storage, whitelist: ["cart"] };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== "production" && logger, sagaMiddleWare].filter((middleware): middleware is Middleware =>
  Boolean(middleware)
);

const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
