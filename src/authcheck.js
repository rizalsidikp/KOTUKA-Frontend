import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { statusHtmlStorage } from './services/helper'

export default (ComposedComponent) => {
	return class AuthCheck extends Component {
		authenticate = false
		
		componentWillMount() {
			const isActive = statusHtmlStorage('accessToken')
			if(isActive) {
				this.authenticate = true
			}
		}

		componentWillUpdate() {
			const isActive = statusHtmlStorage('accessToken')
			if(isActive) {
				this.authenticate = true
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