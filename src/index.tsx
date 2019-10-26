import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './redux';
import history from './utils/history';

const store = configureStore({}, history);

const renderApp = () =>
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', renderApp);
}

renderApp();
