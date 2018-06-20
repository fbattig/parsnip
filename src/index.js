import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { createStore } from 'redux';
import tasks from './reducers';
import { Provider } from 'react-redux';

import './index.css';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(tasks);

ReactDOM.render(
<Provider store={store}>
    <App  />
</Provider>,
 document.getElementById('root'));
registerServiceWorker();
