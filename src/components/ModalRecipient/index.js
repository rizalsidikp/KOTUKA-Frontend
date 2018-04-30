import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'

import './style.scss'
import strings from '../../localizations'
import LabelInput from '../LabelInput'

class ModalRecipient extends Component {
	constructor(props){
		super(props)
		this.state={
			bank_account: '',
			sort_code: '',
			country: '',
			first_n_midle_name: '',
			last_name: ''
		}
	}
	render() {
		return (
			<Modal open={ this.props.open } onClose={ this.props.onClose }>
				<h2 className="ml-header background-blue font24 text-white font-weight-bold no-margin" >{ strings.add_new_recipient_account }</h2>
				<div className="ml-content">
					<LabelInput name='bank_account' label={ strings.first_n_midle_name } placeholder={ strings.first_n_midle_name } value={ this.state.first_n_midle_name } onChange={ (e) => this.setState({ first_n_midle_name: e.target.value }) } />
					<LabelInput name='bank_account' label={ strings.last_name } placeholder={ strings.last_name } value={ this.state.last_name } onChange={ (e) => this.setState({ last_name: e.target.value }) } />
					<LabelInput name='bank_account' label={ strings.country } placeholder={ strings.country } value={ this.state.country } onChange={ (e) => this.setState({ country: e.target.value }) } />
					<LabelInput name='bank_account' label={ strings.bank_account } placeholder={ strings.bank_account } value={ this.state.bank_account } onChange={ (e) => this.setState({ bank_account: e.target.value }) } />
					<LabelInput name='email' label={ strings.sort_code } placeholder={ strings.sort_code } value={ this.state.sort_code } onChange={ (e) => this.setState({ sort_code: e.target.value }) } />								
					<button className="button button-blue full-width button-rounded font-weight-bold modal-button button-shadow text-white">{ strings.add }</button>					
				</div>
			</Modal>
		)
	}
}

ModalRecipient.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func
}

export default ModalRecipient