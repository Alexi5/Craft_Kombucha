import { createStore, applyMiddleware, combineReducers } from 'redux'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import {whoami} from './reducers/auth'

const store = createStore(rootReducer, applyMiddleware(createLogger({collapsed: true}), thunkMiddleware))

export default store;

// Set the auth info at start
store.dispatch(whoami()) 
