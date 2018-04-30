import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'

import './style.scss'
import strings from '../../localizations'
import LabelInput from '../LabelInput'

class ModalHelp extends Component {
	constructor(props){
		super(props)
		this.state={
			email_address: '',
			question: ''
		}
	}
	render() {
		return (
			<Modal open={ this.props.open } onClose={ this.props.onClose }>
				<h2 className="ml-header background-blue font24 text-white font-weight-bold no-margin" >Send Email</h2>
				<div className="ml-content">
					<LabelInput name='bank_account' label={ strings.email_address } placeholder={ strings.email_address } value={ this.state.email_address } onChange={ (e) => this.setState({ email_address: e.target.value }) } />
					<LabelInput type="textarea" name='bank_account' label={ strings.question } placeholder={ strings.question } value={ this.state.question } onChange={ (e) => this.setState({ question: e.target.value }) } />
					<button className="button button-blue full-width button-rounded font-weight-bold modal-button button-shadow text-white">{ strings.send }</button>					
				</div>
			</Modal>
		)
	}
}

ModalHelp.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func
}

export default ModalHelp