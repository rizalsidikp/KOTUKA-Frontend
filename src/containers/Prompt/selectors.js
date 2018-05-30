import { createSelector } from 'reselect'

export const selectPrompt = () => state => state.promptReducer

export const getPrompt = () => createSelector(
	selectPrompt(),
	state => state.get('prompt')
)