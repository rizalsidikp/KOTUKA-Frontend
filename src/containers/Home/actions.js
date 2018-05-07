import * as constants from './constants'
import tradingService from './../../services/trading'
import fx from 'money'
import accounting from 'accounting'


export function setInitialState() {
	return (dispatch) => {
		dispatch({ type: constants.SET_INITIAL_STATE })
		dispatch(setTrades([]))
		dispatch(setSelectedTrades([]))
	}
}

export function setLoading(loading) {
	return { type: constants.SET_LOADING, payload: { loading } }
}


export function setTrades(closestTrade) {
	return { type: constants.GET_TRADES, payload: { closestTrade } }
}

export function setAmountNeed(amountNeed) {
	return { type: constants.SET_AMOUNT_NEED, payload: { amountNeed } }
}


export function setAmountNeedInt(amountNeedInt) {
	return { type: constants.SET_AMOUNT_NEED_INTEGER, payload: { amountNeedInt } }
}

export function setAmountHaveInt(amountHaveInt) {
	return { type: constants.SET_AMOUNT_HAVE_INTEGER, payload: { amountHaveInt } }
}

export function setChooseNeed(chooseNeed) {
	return { type: constants.SET_CHOOSE_NEED, payload: { chooseNeed } }
}

export function setAmountHave(amountHave) {
	return { type: constants.SET_AMOUNT_HAVE, payload: { amountHave } }
}

export function setChooseHave(chooseHave) {
	return { type: constants.SET_CHOOSE_HAVE, payload: { chooseHave } }
}


export function setSelectedTrades(selectedTrades) {
	return { type: constants.SET_SELECTED_TRADES, payload: { selectedTrades } }
}


export function setDetailPage(detail_page) {
	return { type: constants.GET_DETAIL_PAGE, payload: { detail_page } }
}

export function setIsSearching(isSearching) {
	return { type: constants.SET_IS_SEARCHING, payload: { isSearching } }
}


export function isGettingTrade(isGettingTrade) {
	return { type: constants.IS_GETTING_TRADE, payload: { isGettingTrade } }
}

export function getClosestTrade(need, have, amount, transfer, page) {
	return async(dispatch) => {
		dispatch(setLoading(true))
		dispatch(setIsSearching(true))
		dispatch(isGettingTrade(true))
		dispatch(setSelectedTrades([]))		
		try {
			const payload = {
				need,
				have,
				amount,
				page
			}
			const response = await tradingService.getClosestTrade(payload)
			dispatch(setTrades(response.result))
			dispatch(setDetailPage(response.detail_page || {
				total_page: 1,
				on_page: 1
			} ))
			console.log(response.result)			
		} catch (error) {
			console.log(error)
		}
		dispatch(isGettingTrade(false))		
		dispatch(setLoading(false))		
	}
}


export function tradeSelected(selectedTrades, trade) {
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			let trades = selectedTrades
			trades.push(trade)
			dispatch(setSelectedTrades(trades))
		} catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))		
	}
}

export function removeTrade(selectedTrades, index) {
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			let trades = selectedTrades
			trades.splice(index, 1)
			dispatch(setSelectedTrades(trades))
		} catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))		
	}
}

export function convertMoney(val, selectedNeed, selectedHave) {
	return async(dispatch) =>{
		dispatch(setLoading(true))
		try {
			let amountNeed = parseFloat(val)
			const response = await tradingService.getRates()
			fx.rates = response.rates
			let amountHave = fx(parseFloat(amountNeed)).from(selectedNeed).to(selectedHave)
			if(selectedHave === 'IDR'){
				amountHave = Math.round(amountHave)
				amountHave = accounting.formatMoney(amountHave,'', 0, ',')
			}else{
				amountHave = Math.round(amountHave * 100) / 100
				amountHave = accounting.formatMoney(amountHave,'', 2, ',')
			}
			if(selectedNeed === 'IDR'){
				amountNeed = Math.round(amountNeed)
				amountNeed = accounting.formatMoney(amountNeed,'', 0, ',')
			}else{
				amountNeed = Math.round(amountNeed * 100) / 100
				amountNeed = accounting.formatMoney(amountNeed,'', 2, ',')
			}
			amountHave = amountHave.toString()
			amountNeed = amountNeed.toString()
			dispatch(setAmountNeed(amountNeed))
			dispatch(setAmountHave(amountHave))
		} catch (error) {
			console.error(error)
		}
		dispatch(setLoading(false))		
	}
}