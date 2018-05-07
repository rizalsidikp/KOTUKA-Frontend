import { createSelector } from 'reselect'

export const selectPost = () => state => state.postReducer

export const getLoading = () => createSelector(
	selectPost(),
	state => state.get('loading')
)