import { createSelector } from 'reselect'

export const selectHome = () => state => state.homeReducer

export const getLoading = () => createSelector(
	selectHome(),
	state => state.get('loading')
)

export const getAmountNeed = () => createSelector(
	selectHome(),
	state => state.get('amountNeed')
)

export const getAmountHave = () => createSelector(
	selectHome(),
	state => state.get('amountHave')
)

export const getChooseNeed = () => createSelector(
	selectHome(),
	state => state.get('chooseNeed')
)

export const getChooseHave = () => createSelector(
	selectHome(),
	state => state.get('chooseHave')
)

export const getClosestTrade = () => createSelector(
	selectHome(),
	state => state.get('closestTrade')
)

export const getSelectedTrades = () => createSelector(
	selectHome(),
	state => state.get('selectedTrades')
)