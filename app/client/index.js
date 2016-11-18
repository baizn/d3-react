import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'

import configureStore from 'src/store/configureStore'
import createRoutes from './routes'
import { Provider } from 'react-redux'

let initialState = {}
if (window.__INITIAL_STATE__) {
  console.log('initialState=' + JSON.stringify(window.__INITIAL_STATE__))
  try {
    initialState = JSON.parse(JSON.stringify(window.__INITIAL_STATE__))
  } catch (e) {
    console.log('JSON.parse faild')
  }
}

const store = configureStore(initialState)

ReactDOM.render((
  <Provider store={store}>
    { createRoutes(browserHistory) }
  </Provider>
), document.getElementById('container'))
