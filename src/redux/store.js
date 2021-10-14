// Redux
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Middleware
import thunk from 'redux-thunk';

// RootReducer
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
