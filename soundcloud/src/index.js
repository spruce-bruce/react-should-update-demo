import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from './containers/App';
import Album from './containers/Album';
import Search from './containers/Search';
import { Router, Route, browserHistory } from 'react-router'

const store = configureStore();
const createAppElement = (Component, props) => {
  return <Component {...props} />;
};
render(
  <Provider store={store}>
    <Router history={browserHistory} createElement={createAppElement}>
      <Route component={App}>
        <Route path="/" component={Search} />
        <Route path="/album" component={Album} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
