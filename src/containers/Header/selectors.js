import { createSelector } from 'reselect'

export const selectHeader = () => state => state.headerReducer

export const getLoading = () => createSelector(
	selectHeader(),
	state => state.get('loading')
)