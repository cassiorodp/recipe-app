// React
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Children
import App from './App';

// Styles
import './styles/index.css';

ReactDOM.render(
  <HashRouter>
    <Provider store={ store }>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
);
