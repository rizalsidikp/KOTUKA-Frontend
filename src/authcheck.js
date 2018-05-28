import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { statusHtmlStorage } from './services/helper'

export default (ComposedComponent) => {
	return class AuthCheck extends Component {
		authenticate = false
		secondRegistration = false
		
		componentWillMount() {
			const isActive = statusHtmlStorage('accessToken')
			const secRegist = localStorage.getItem('secondRegistration')
			if(isActive) {
				this.authenticate = true
			}
			if(secRegist) {
				this.secondRegistration = true
			}
		}

		componentWillUpdate() {
			const isActive = statusHtmlStorage('accessToken')
			const secRegist = localStorage.getItem('secondRegistration')			
			if(isActive) {
				this.authenticate = true
			}
			if(secRegist) {
				this.secondRegistration = true
			}
		}

		render() {
			if (!this.authenticate) {
				return(<Redirect to="/" />)
			}
			if (this.secondRegistration) {
				return(<Redirect to="/secondregistration" />)
			}
			return (<ComposedComponent />)
		}
	}
}