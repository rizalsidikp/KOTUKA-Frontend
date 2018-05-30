import * as constants from './constants'
import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
	prompt: false,
	header: '',
	text: ''
})

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
	case constants.SET_PROMPT:
		return state.set('prompt', action.payload.prompt)
			.set('header', action.payload.header)
			.set('text', action.payload.text)
	default: return state
	}
}