import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import tasks from './reducers';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(
    tasks, 
    composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store}>
    <App  />
</Provider>,
 document.getElementById('root'));
registerServiceWorker();
