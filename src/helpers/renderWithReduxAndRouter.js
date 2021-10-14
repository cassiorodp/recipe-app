import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { LocalStorageMock } from '@react-mock/localstorage';
import rootReducer from '../redux/reducers';

const renderWithReduxAndRouter = (component, {
  initialState = {},
  initialEntries = ['/'],
  items = {},
} = {}) => {
  const history = createMemoryHistory({ initialEntries });
  const store = createStore(rootReducer, initialState);
  return ({
    ...render(
      <Router history={ history }>
        <Provider store={ store }>
          <LocalStorageMock items={ items }>
            { component }
          </LocalStorageMock>
        </Provider>
      </Router>,
    ),
    history,
    store,
  });
};

export default renderWithReduxAndRouter;
