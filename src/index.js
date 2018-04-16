import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import allReducers from './reducer/index'
import {createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import {connect,Provider} from 'react-redux';
import {ConnectedRouter,routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import Header1 from './component/header'
import Footer from './component/footer'
const history=createHistory();
let store=createStore(allReducers,composeWithDevTools(),applyMiddleware(thunk,routerMiddleware(history)));
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div className="App">
                <Header1/>
                <App />
                {/*<Footer/>*/}
            </div>
        </ConnectedRouter>
    </Provider>, document.getElementById('root'));
