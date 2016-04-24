import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import store from './store';
import DevTools from './dev-tools-component';

const createAppElement = (Component, props) => (<Component {...props} />);

const renderDevToolsIfInDev = () => { //eslint-disable-line
  if (process.env.NODE_ENV === 'development') {
    return <DevTools />;
  }

  return null;
};

export default (
  <Provider store={store}>
    <div>
      {renderDevToolsIfInDev()}
      <Router
        createElement={createAppElement}
        history={browserHistory}
      >
        {routes}
      </Router>
    </div>
  </Provider>
);
