import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { statusHtmlStorage } from './services/helper'

export default (ComposedComponent, type) => {
	return class AuthCheck extends Component {
		authenticate = false
		
		componentWillMount() {
			const isActive = statusHtmlStorage('accessToken')
			const scope = localStorage.getItem('scope')
			if(isActive) {
				this.authenticate = true
			}
			if (type === 'user') {
				this.authenticate = this.authenticate && scope === 'user-app'
			}
			if (type === 'corporate') {
				this.authenticate = this.authenticate && scope === 'partner'
			}
		}

		componentWillUpdate() {
			const isActive = statusHtmlStorage('accessToken')
			const scope = localStorage.getItem('scope')
			if(isActive) {
				this.authenticate = true
			}
			if (type === 'user') {
				this.authenticate = this.authenticate && scope === 'user-app'
			}
			if (type === 'corporate') {
				this.authenticate = this.authenticate && scope === 'partner'
			}
		}

		render() {
			if (!this.authenticate) {
				return(<Redirect to="/" />)
			}
			return (<ComposedComponent />)
		}
	}
}