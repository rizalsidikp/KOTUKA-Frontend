import * as constants from './constants'
import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
	loading: false,
	countries: []
})

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
	case constants.SET_LOADING:
		return state.set('loading',  action.payload.loading)
	case constants.SET_COUNTRIES:
		return state.set('countries',  action.payload.countries)
	case constants.SET_INITIAL_STATE: 
		return INITIAL_STATE
	default: return state
	}
}