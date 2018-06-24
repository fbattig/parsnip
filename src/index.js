import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import tasksReducer from './reducers';

import logger from './middleware/logger';
import analytics from './middleware/analytics';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = (state = {}, action) => {
    return {
      tasks: tasksReducer(state.tasks, action),
    };
  };
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger, analytics)));

ReactDOM.render(
<Provider store={store}>
    <App  />
</Provider>,
 document.getElementById('root'));
registerServiceWorker();
