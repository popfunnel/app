import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import configureStore from './configureStore';
import './index.css';
// import './fonts/FiraSans-Regular.ttf'

const store = configureStore();

const routing = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));
