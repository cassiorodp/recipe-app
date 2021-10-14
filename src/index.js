// React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Children
import App from './App';

// Styles
import './styles/index.css';

ReactDOM.render(
  <Router>
    <Provider store={ store }>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
