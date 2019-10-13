import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import { helloSaga } from './sagas';

export const store = createStore(reducer, applyMiddleware());

export default function configureStore(initialState = {}, history: History) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(reducer, initialState, composedEnhancers);

  sagaMiddleware.run(helloSaga);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer', () => store.replaceReducer(reducer));
  }

  return store;
}
