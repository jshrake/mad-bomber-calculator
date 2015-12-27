import React from 'react';
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import Calculator from './containers/Calculator';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <Calculator />
    </Provider>,
    document.getElementById('app')
);
