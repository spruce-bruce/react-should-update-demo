/* globals window */
import React from 'react';
import ReactDOM from 'react-dom';
import RootComponent from './root-component';

window.React = React;

ReactDOM.render(
  RootComponent,
  document.getElementById('app')
);
