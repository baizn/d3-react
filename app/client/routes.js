import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from 'src/store/configureStore';

import Home from 'src/containers/home';
import DefaultIndex from 'src/containers/default';

export default function(history) {
  return (
    <Router history={history}>
      <Route path="/" component={Home}>
        <IndexRoute component={DefaultIndex} />
      </Route>
    </Router>
  );
};
