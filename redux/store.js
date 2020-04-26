import { createStore, compose /* , applyMiddleware*/ } from "redux";
// import someReduxMiddleware from 'some-redux-middleware';
// import someOtherReduxMiddleware from 'some-other-redux-middleware';
import rootReducer from "./reducers/rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from 'react-native';

const persistConfig = {
	key: "root",
	storage: AsyncStorage
};
const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === "function") {
	enhancerList.push(devToolsExtension());
}

const composedEnhancer = compose(
	/* applyMiddleware(someReduxMiddleware, someOtherReduxMiddleware),*/ ...enhancerList
);

const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer, {}, composedEnhancer);
export const persistor = persistStore(store);

