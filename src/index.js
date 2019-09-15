import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './Component/App';

// menghubung reducer ke component
import reducer from './reducers/index'
// create store di pakai untuk membuat reducer
import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
// untuk ngesend data dari reducer balik ke component
import {Provider} from "react-redux"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// mengkasih tau reducer yang mana
const STORE = createStore(
    reducer,
    // menampilkan reducer di website sendiri
    composeEnhancers(applyMiddleware(thunk))
)

    
ReactDOM.render(
    // mengkasih tau ke semua component reducer yang mana
<Provider store = {STORE}>
<App/>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// import * as serviceWorker from './serviceWorker';
// serviceWorker.unregister();
