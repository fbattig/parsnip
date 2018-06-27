import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import tasksReducer from './reducers';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = (state = {}, action) => {
    return {
      tasks: tasksReducer(state.tasks, action),
    };
  };
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
<Provider store={store}>
    <App  />
</Provider>,
 document.getElementById('root'));

 
registerServiceWorker();
