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

export const getAmountNeedInt = () => createSelector(
	selectHome(),
	state => state.get('amountNeedInt')
)

export const getAmountHaveInt = () => createSelector(
	selectHome(),
	state => state.get('amountHaveInt')
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


export const getDetailPage = () => createSelector(
	selectHome(),
	state => state.get('detail_page')
)

export const getIsSearching = () => createSelector(
	selectHome(),
	state => state.get('isSearching')
)

export const getIsGettingTrade = () => createSelector(
	selectHome(),
	state => state.get('isGettingTrade')
)