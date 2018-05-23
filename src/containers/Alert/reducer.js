import * as constants from './constants'
import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
	alert: false,
})

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
	case constants.SET_ALERT:
		return state.set('alert', action.payload.alert)
	default: return state
	}
}