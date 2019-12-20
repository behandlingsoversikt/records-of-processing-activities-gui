import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import RootReducer from './reducer';
import RootSaga from './saga';

import { authService } from '../../../services/auth-service';

const sagaMiddleware = createSagaMiddleware({
  context: {
    auth: authService
  }
});

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(RootSaga);

export default store;
