import * as constants from './constants'
import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
	loading: false,
	amountNeed: '',
	amountHave: '',
	amountNeedInt: 0,
	amountHaveInt: 0,
	chooseNeed:  {
		country_flag: 'https://www.geoips.com/assets/img/flag/128/id.png',
		currency_alias: 'IDR',
		currency_name: 'Indonesian Rupiah',
		currency_symbol: 'Rp',
		fixed_cost: '20000.00',
		id: 4,
		max_exchange: '4000000.00',
		min_exchange: '500000.00',
		percentage: '0.5',
	},
	chooseHave: {
		country_flag: 'https://www.geoips.com/assets/img/flag/128/gb.png',
		currency_alias: 'GBP',
		currency_name: 'Great Britain Poundsterling',
		currency_symbol: '£',
		fixed_cost: '2.00',
		id: 3,
		max_exchange: '200.00',
		min_exchange: '25.00',
		percentage: '0.5',
	},
	selectedTrades: [],
	closestTrade: [],
	detail_page: {
		total_page: 1,
		on_page: 1
	},
	isSearching: false,
	isGettingTrade: false,
	rate: 0,
})

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
	case constants.SET_LOADING:
		return state.set('loading', action.payload.loading)
	case constants.SET_INITIAL_STATE:
		return INITIAL_STATE
	case constants.SET_AMOUNT_NEED:
		return state.set('amountNeed', action.payload.amountNeed)	
	case constants.SET_AMOUNT_HAVE:
		return state.set('amountHave', action.payload.amountHave)		
	case constants.SET_AMOUNT_NEED_INTEGER:
		return state.set('amountNeedInt', action.payload.amountNeedInt)	
	case constants.SET_AMOUNT_HAVE_INTEGER:
		return state.set('amountHaveInt', action.payload.amountHaveInt)		
	case constants.SET_CHOOSE_NEED:
		return state.setIn(['chooseNeed', 'country_flag'], action.payload.chooseNeed.country_flag)
			.setIn(['chooseNeed', 'currency_alias'], action.payload.chooseNeed.currency_alias)
			.setIn(['chooseNeed', 'currency_name'], action.payload.chooseNeed.currency_name)
			.setIn(['chooseNeed', 'currency_symbol'], action.payload.chooseNeed.currency_symbol)
			.setIn(['chooseNeed', 'fixed_cost'], action.payload.chooseNeed.fixed_cost)
			.setIn(['chooseNeed', 'id'], action.payload.chooseNeed.id)
			.setIn(['chooseNeed', 'max_exchange'], action.payload.chooseNeed.max_exchange)
			.setIn(['chooseNeed', 'min_exchange'], action.payload.chooseNeed.min_exchange)
			.setIn(['chooseNeed', 'percentage'], action.payload.chooseNeed.percentage)
	case constants.SET_CHOOSE_HAVE:
		return state.setIn(['chooseHave', 'country_flag'], action.payload.chooseHave.country_flag)
			.setIn(['chooseHave', 'currency_alias'], action.payload.chooseHave.currency_alias)
			.setIn(['chooseHave', 'currency_name'], action.payload.chooseHave.currency_name)
			.setIn(['chooseHave', 'currency_symbol'], action.payload.chooseHave.currency_symbol)
			.setIn(['chooseHave', 'fixed_cost'], action.payload.chooseHave.fixed_cost)
			.setIn(['chooseHave', 'id'], action.payload.chooseHave.id)
			.setIn(['chooseHave', 'max_exchange'], action.payload.chooseHave.max_exchange)
			.setIn(['chooseHave', 'min_exchange'], action.payload.chooseHave.min_exchange)
			.setIn(['chooseHave', 'percentage'], action.payload.chooseHave.percentage)
	case constants.GET_TRADES:
		return state.set('closestTrade', action.payload.closestTrade)
	case constants.SET_SELECTED_TRADES:
		return state.set('selectedTrades', action.payload.selectedTrades)
	case constants.GET_DETAIL_PAGE:
		return state.setIn(['detail_page', 'total_page'], action.payload.detail_page.total_page)
			.setIn(['detail_page', 'on_page'], action.payload.detail_page.on_page)
	case constants.SET_IS_SEARCHING:
		return state.set('isSearching', action.payload.isSearching)
	case constants.IS_GETTING_TRADE:
		return state.set('isGettingTrade', action.payload.isGettingTrade)
	case constants.SET_RATE:
		return state.set('rate', action.payload.rate)
	default: return state
	}
}