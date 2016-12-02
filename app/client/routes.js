import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from 'src/store/configureStore';

// import Home from 'src/containers/home';
import DefaultIndex from 'src/containers/default';
import Home from 'test/index'
import Pie from '../test/containers/pie'
import CircleProgress from '../test/containers/circleProgress'
import TickBar from '../test/containers/tickBar'

export default function(history) {
  return (
    <Router history={history}>
      <Route path="/" component={Home}>
        <Route path="pie" component={Pie} />
        <Route path="circleProgress" component={CircleProgress} />
        <Route path="tickbar" component={TickBar} />
        <IndexRoute component={Pie} />
      </Route>
    </Router>
  );
};
