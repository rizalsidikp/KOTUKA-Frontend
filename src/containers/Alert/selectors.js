import { createSelector } from 'reselect'

export const selectAlert = () => state => state.alertReducer

export const getAlert = () => createSelector(
	selectAlert(),
	state => state.get('alert')
)