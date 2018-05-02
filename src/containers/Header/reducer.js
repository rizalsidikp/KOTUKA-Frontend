import * as constants from './constants'
import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
	loading: false
})

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
	case constants.SET_LOADING:
		return state.set('loading',  action.payload.loading)
	default: return state
	}
}