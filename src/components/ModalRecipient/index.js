import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import currenciesService from './../../services/currencies'

import './style.scss'
import strings from '../../localizations'
import LabelInput from '../LabelInput'
import RadioButton from '../RadioButton'
import Row from '../Row'
import { chunkArray } from '../../services/helper'
import Select from 'react-select-plus'

class ModalRecipient extends Component {
	constructor(props){
		super(props)
		this.state={
			myself: false,
			bank_account: '',
			sort_code: '',
			iban: '',
			bank_name: '',
			currency: null,
			first_and_middle_name: '',
			last_name: '',
			description: '',
			currencies: []			
		}
	}

	onAddRecipient = () => {
		const payload = {
			myself: this.state.myself,
			first_and_middle_name: this.state.first_and_middle_name,
			last_name: this.state.last_name,
			description: this.state.description,
			account_no: this.state.bank_account,
			sort_code: this.state.sort_code,
			iban: this.state.iban,
			bank_name: this.state.bank_name,
			id_currency: this.state.currency.id
		}
		this.props.addAccount(payload)
	}

	componentWillMount() {
		this.setType(this.state.myself)
		this.getCurrencies()
	}

	getCurrencies = async() => {
		const response = await currenciesService.getCurrencies()
		const currencies = response.result
		this.setState({ currencies, currency: currencies[0] })
	}
	
	setType = (myself) => {
		if(myself){
			this.setState({ 
				first_and_middle_name: this.props.first_and_middle_name,
				last_name: this.props.last_name,
				myself
			})
		}else{
			this.setState({ 
				first_and_middle_name: '',
				last_name: '',
				myself
			})
		}
	}

	onSelectChange = (val) => {
		this.setState({ currency: val })
	}

	renderItem = (props) => {
		return(
			<div className="Select-value">
				<img className="select-logo" src={ props.image } />
				<span className="Select-value-label">{ props.value }</span>
			</div>
		)
	}

	render() {
		const options = chunkArray(this.state.currencies, 'currency_alias', 'currency_alias', 'country_flag')
		return (
			<Modal open={ this.props.open } onClose={ this.props.onClose }>
				<h2 className="ml-header background-secondary font24 text-white font-weight-bold no-margin" >{ strings.add_new_recipient_account }</h2>
				<div className="ml-content">
					<label className="font16 text-secondary full-width no-margin font-weight-semi-bold">Type</label>				
					<Row>
						<RadioButton label={ strings.myself } name='type' checked={ this.state.myself } onClick={ () => this.setType(true) } />
						<RadioButton label={ strings.someone_else } name='type' checked={ this.state.myself === false } onClick={ () => this.setType(false) } />
					</Row>
					<LabelInput name='bank_account' disabled={ this.state.myself } label={ strings.first_n_midle_name } placeholder={ strings.first_and_middle_name } value={ this.state.first_and_middle_name } onChange={ (e) => this.setState({ first_and_middle_name: e.target.value }) } />
					<LabelInput name='bank_account' disabled={ this.state.myself } label={ strings.last_name } placeholder={ strings.last_name } value={ this.state.last_name } onChange={ (e) => this.setState({ last_name: e.target.value }) } />
					
					<label className="font16 text-secondary full-width no-margin font-weight-semi-bold">{ strings.currency }</label>					
					<Select
						className="li-input-select"
						name="form-field-name"
						value={ this.state.currency ? this.state.currency.currency_alias : '' }
						clearable={ false }
						onChange={ this.onSelectChange }
						autosize={ false }
						options={ options }
						valueRenderer={ (props) => this.renderItem(props) }
					/>


					<LabelInput name='bank_account' label={ strings.bank_account } placeholder={ strings.bank_account } value={ this.state.bank_account } onChange={ (e) => this.setState({ bank_account: e.target.value }) } />
					<LabelInput name='email' label={ strings.sort_code } placeholder={ strings.sort_code } value={ this.state.sort_code } onChange={ (e) => this.setState({ sort_code: e.target.value }) } />								
					<LabelInput name='email' label={ strings.description } placeholder={ strings.description } value={ this.state.description } onChange={ (e) => this.setState({ description: e.target.value }) } />								
					<button disabled={ this.props.loading } className="button button-secondary full-width modal-button" onClick={ this.onAddRecipient }>{ strings.add }</button>					
				</div>
			</Modal>
		)
	}
}

ModalRecipient.propTypes = {
	open: PropTypes.bool,
	first_and_middle_name: PropTypes.string,
	last_name: PropTypes.string,
	onClose: PropTypes.func,
	addAccount: PropTypes.func,
	loading: PropTypes.bool,
}

export default ModalRecipient