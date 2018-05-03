import * as constants from './constants'
import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
	loading: false,
	amountNeed: '',
	amountHave: '',
	chooseNeed: 'IDR',
	chooseHave: 'GBP',
	selectedTrades: [],
	closestTrade: [],
})

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
	case constants.SET_LOADING:
		return state.set('loading', action.payload.loading)
	case constants.SET_AMOUNT_NEED:
		return state.set('amountNeed', action.payload.amountNeed)
	case constants.SET_AMOUNT_HAVE:
		return state.set('amountHave', action.payload.amountHave)
	case constants.SET_CHOOSE_NEED:
		return state.set('chooseNeed', action.payload.chooseNeed)
	case constants.SET_CHOOSE_HAVE:
		return state.set('chooseHave', action.payload.chooseHave)
	case constants.GET_TRADES:
		return state.set('closestTrade', action.payload.closestTrade)
	case constants.SET_SELECTED_TRADES:
		return state.set('selectedTrades', action.payload.selectedTrades)
	default: return state
	}
}