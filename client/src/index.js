import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Admin from './components/Admin';
import { BrowserRouter, Switch} from 'react-router-dom'
//import ConnectedSearch from './components/Search'
import { Route } from 'react-router'
// import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import mainReducer from './Reducers'

//import watchFetchSearchData from './Sagas.js'


import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'


ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/admin' component={Admin} />
      </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
