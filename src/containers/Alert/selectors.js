import { createSelector } from 'reselect'

export const selectAlert = () => state => state.alertReducer

export const getAlert = () => createSelector(
	selectAlert(),
	state => state.get('alert')
)

export const getTheme = () => createSelector(
	selectAlert(),
	state => state.get('theme')
)


export const getMessage = () => createSelector(
	selectAlert(),
	state => state.get('message')
)