import * as constants from './constants'
import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
	purpose: [],
	selectedPurpose: {
		id: 1,
		teks_purpose: 'Mengirim uang ke rumah untuk keluarga',
		text_purpose:	'Sending money home to family',
	}
})

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
	case constants.SET_PURPOSE:
		return state.set('purpose',  action.payload.purpose)
	case constants.SET_SELECTED_PURPOSE:
		return state.setIn(['selectedPurpose', 'id'], action.payload.selectedPurpose.id)
			.setIn(['selectedPurpose', 'teks_purpose'], action.payload.selectedPurpose.teks_purpose)
			.setIn(['selectedPurpose', 'text_purpose'], action.payload.selectedPurpose.text_purpose)
	case constants.SET_INITIAL_STATE: 
		return INITIAL_STATE
	default: return state
	}
}