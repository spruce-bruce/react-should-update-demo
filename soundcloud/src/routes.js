import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from './app';
import Search from './containers/search';
import MyList from './containers/my-list';

export default (
    <Router history={browserHistory}>
        <Route component={App}>
            <Route path="/" component={Search} />
            <Route path="/my-list" component={MyList} />
        </Route>
    </Router>
);
