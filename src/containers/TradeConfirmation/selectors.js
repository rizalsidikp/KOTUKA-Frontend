import { createSelector } from 'reselect'

export const selectTrade = () => state => state.tradeConfirmationReducer

export const getPurpose = () => createSelector(
	selectTrade(),
	state => state.get('purpose')
)

export const getSelectedPurpose = () => createSelector(
	selectTrade(),
	state => state.get('selectedPurpose')
)

export const getLoading = () => createSelector(
	selectTrade(),
	state => state.get('loading')
)