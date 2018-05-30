import { createSelector } from 'reselect'

export const selectHeader = () => state => state.headerReducer

export const getLoading = () => createSelector(
	selectHeader(),
	state => state.get('loading')
)

export const getUser = () => createSelector(
	selectHeader(),
	state => state.get('user')
)


export const getInvalid = () => createSelector(
	selectHeader(),
	state => state.get('invalid')
)

export const getInvalidMessage = () => createSelector(
	selectHeader(),
	state => state.get('invalidMessage')
)