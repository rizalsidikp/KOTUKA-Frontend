import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import LabelInput from './../LabelInput'


// import './style.scss'
import strings from '../../localizations'

import { validatePassword } from './../../services/helper'


class ModalChangePassword extends Component {
	constructor(props){
		super(props)
		this.state = {
			old_password: '',
			new_password: '',
			c_password: ''
		}
	}
	onChangePassword = async() => {
		const { old_password, new_password } = this.state
		const payload = {
			old_password,
			new_password
		}
		await this.props.onClick(payload)
		this.setState({ old_password : '', new_password: '', c_password: '' })
	}
	
	onClose = () => {
		this.props.onClose()
		this.setState({ old_password : '', new_password: '', c_password: '' })
	}

	render() {
		const vNewPassword = validatePassword(this.state.new_password)
		const vCPassword = this.state.new_password === this.state.c_password

		const valid = this.state.old_password && vNewPassword && vCPassword
		return (
			<Modal open={ this.props.open } onClose={ this.onClose } >
				<div className="mic-content">			
					<h2 className="font24 text-center text-black-semi font-weight-bold">
						{ strings.change_password }
					</h2>
					<hr />
					<LabelInput
						type="password"
						name="oldPassword"
						label={ strings.your_old_password }
						placeholder={ strings.your_old_password }
						value={ this.state.old_password }
						onChange={ (e) => this.setState({ old_password: e.target.value }) }
					/>
					<LabelInput
						type="password"
						name="newPassword"
						label={ strings.your_new_password }
						placeholder={ strings.your_new_password }
						value={ this.state.new_password }
						onChange={ (e) => this.setState({ new_password: e.target.value }) }
						invalid={ !vNewPassword && !!this.state.new_password }
						invalidMessage={ strings.password_validation }
					/>
					<LabelInput
						type="password"
						name="cPassword"
						label={ strings.confirm_new_password }
						placeholder={ strings.confirm_new_password }
						value={ this.state.c_password }
						onChange={ (e) => this.setState({ c_password: e.target.value }) }
						invalid={ !vCPassword && !!this.state.c_password }
						invalidMessage={ strings.password_not_match }
					/>
					<button disabled={ this.props.loading || !valid } className="button button-primary full-width" onClick={ this.onChangePassword }>{ strings.change }</button>
				</div>
			</Modal>
		)
	}
}

ModalChangePassword.propTypes = {
	open: PropTypes.bool,
	loading: PropTypes.bool,
	onClose: PropTypes.func,
	onClick: PropTypes.func,
	onButtonClick: PropTypes.func,
}

export default ModalChangePassword