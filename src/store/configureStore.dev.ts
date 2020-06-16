import { createStore, applyMiddleware, compose, Store } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sagaMonitor from '@redux-saga/simple-saga-monitor';
import { routerMiddleware } from 'connected-react-router';
import history from '@/utils/history';
import createRootReducer from './reducers';
const historyMiddleware = routerMiddleware(history);
const persistConfig = {
  key: 'root',
  storage,
};
interface selfStore extends Store {
  runSaga?: Function;
  close?: Function;
}
const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history),
);
export default function configureStore(initialState: any) {
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
  const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware, historyMiddleware),
  );
  const store: selfStore = createStore(
    persistedReducer,
    initialState,
    enhancer,
  );
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return {
    store,
    persistor: persistStore(store),
    history,
  };
}
