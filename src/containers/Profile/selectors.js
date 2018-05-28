import { createSelector } from 'reselect'

export const selectProfile = () => state => state.profileReducer

export const getLoading = () => createSelector(
	selectProfile(),
	state => state.get('loading')
)

export const getCountries = () => createSelector(
	selectProfile(),
	state => state.get('countries')
)