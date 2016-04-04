import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App} />
    </Router>
), document.getElementById('example'));
