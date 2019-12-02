// // menghubung reducer ke component
// import reducer from './reducers/index'
// // create store di pakai untuk membuat reducer
// import {createStore, applyMiddleware, compose} from "redux"
// import thunk from "redux-thunk"
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './Component/App';

// membikin reducer
import reducer from "./reducer/index";
// import function dari reducer
import { createStore, applyMiddleware,compose} from 'redux'
// mengimport provider 
import {Provider} from "react-redux"
// import redux-thunk
import thunk from "redux-thunk"
// import redux-sync - biar redux bisa ngefek semua tab
import { createStateSyncMiddleware } from 'redux-state-sync';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducerFile = createStore(reducer,composeEnhancers(applyMiddleware(thunk, createStateSyncMiddleware(reducer))))
    
ReactDOM.render(
    // mengkasih tau ke semua component reducer yang mana
    <Provider store = {reducerFile}>
<App/>
</Provider>, document.getElementById('root'));