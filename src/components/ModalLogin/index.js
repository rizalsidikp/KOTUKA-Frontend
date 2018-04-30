import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'

import './style.scss'
import strings from '../../localizations'
import LabelInput from '../LabelInput'

class ModalLogin extends Component {
	constructor(props){
		super(props)
		this.state={
			email: '',
			password: ''
		}
	}
	render() {
		return (
			<Modal open={ this.props.open } onClose={ this.props.onClose } contentStyle='ml-body'>
				<h2 className="ml-header background-blue font24 text-white font-weight-bold no-margin" >{ strings.lets_start }</h2>
				<div className="ml-content">
					<LabelInput name='email' label={ strings.your_email } placeholder={ strings.email_address } value={ this.state.email } onChange={ (e) => this.setState({ email: e.target.value }) } />
					<LabelInput name='password' type='password' label={ strings.password } placeholder={ strings.password } value={ this.state.password } onChange={ (e) => this.setState({ password: e.target.value }) } />
					<button className="button button-blue-dark full-width button-rounded font-weight-bold login-button button-shadow">{ strings.signup }</button>
					<label className="font16 text-blue-dark text-center full-width clickable">{ strings.or_signup_with }</label>
					<button className="button button-red-google full-width button-rounded font-weight-bold modal-button button-shadow">{ strings.google }</button>
					<button className="button button-blue-facebook full-width button-rounded font-weight-bold modal-button button-shadow">{ strings.facebook }</button>
				</div>
			</Modal>
		)
	}
}

ModalLogin.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func
}

export default ModalLogin