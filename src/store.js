import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import thunkMiddleware from 'redux-thunk'


import HeaderReducer from './containers/Header/reducer'

const rootReducer = {
	headerReducer: HeaderReducer,
}

const Immutable = require('immutable')
const Serialize = require('remotedev-serialize')
const reduxPersist = require('redux-persist')

function immutableTransform(config) {
	config = config || {}

	const serializer =  Serialize.immutable(Immutable, config.records)

	return reduxPersist.createTransform(serializer.stringify, serializer.parse, config)
}

const persistConfig = {
	transforms: [immutableTransform()],
	key: 'root',
	storage
}
  
const reducer = combineReducers(rootReducer)
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware))
export const persistor =  persistStore(store)

