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
		const { type = 'register', open = false } = this.props
		return (
			<Modal open={ open } onClose={ this.props.onClose } contentStyle='ml-body'>
				<h2 className="ml-header background-secondary font24 text-white font-weight-bold no-margin" >{ type === 'register' ? strings.lets_start : strings.login }</h2>
				<div className="ml-content">
					<LabelInput disabled={ this.props.loading } name='email' label={ strings.your_email } placeholder={ strings.email_address } value={ this.state.email } onChange={ (e) => this.setState({ email: e.target.value }) } />
					<LabelInput disabled={ this.props.loading } name='password' type='password' label={ strings.password } placeholder={ strings.password } value={ this.state.password } onChange={ (e) => this.setState({ password: e.target.value }) } />
					<button disabled={ this.props.loading } className="button button-primary full-width login-button" onClick={ () => this.props.onLogin(this.state.email, this.state.password) }>{ type === 'register' ? strings.register : strings.login }</button>
					<label className="font16 text-primary text-center full-width clickable">{ type === 'register' ? strings.or_register_with : strings.or_login_with }</label>
					<button disabled={ this.props.loading } className="button button-red-google full-width modal-button" onClick={ this.props.onGoogleLogin }>{ strings.google }</button>
					<button disabled={ this.props.loading } className="button button-secondary-facebook full-width modal-button" onClick={ this.props.onFacebookLogin }>{ strings.facebook }</button>
				</div>
			</Modal>
		)
	}
}

ModalLogin.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	type: PropTypes.string,
	loading: PropTypes.bool,
	onFacebookLogin: PropTypes.func,
	onGoogleLogin: PropTypes.func,
	onLogin: PropTypes.func
}

export default ModalLogin