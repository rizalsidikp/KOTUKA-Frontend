import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { statusHtmlStorage } from './services/helper'

export default (ComposedComponent, type) => {
	return class AuthCheck extends Component {
		authenticate = true
		
		componentWillMount() {
			const isActive = statusHtmlStorage('accessToken')
			if(!isActive) {
				this.authenticate = false
			}
		}

		componentWillUpdate() {
			const isActive = statusHtmlStorage('accessToken')
			if(!isActive) {
				this.authenticate = false
			}
		}

		render() {
			if (this.authenticate) {
				return(<Redirect to="/dashboard/post" />)
			}
			return (<ComposedComponent />)
		}
	}
}