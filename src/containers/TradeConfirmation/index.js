import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './selectors'
import * as actions from './actions'
import PropTypes from 'prop-types'
import accounting from 'accounting'
import currenciesService from '../../services/currencies'
import Select from 'react-select-plus'
// import getSymbolFromCurrency from 'currency-symbol-map'
import moment from 'moment-timezone'
import { Redirect } from 'react-router-dom'

import Row from '../../components/Row'
import Step from '../../components/Step'
import FormInputMoney from '../../components/FormInputMoney'

import './style.scss'
import strings from '../../localizations'
// import TradeCard from '../../components/TradeCard'
// import LabelInput from '../../components/LabelInput'
// import RadioButton from '../../components/RadioButton'
// import ModalRecipient from '../../components/ModalRecipient'
import { chunkArray, convertMoneyString, formatMoney } from '../../services/helper'
import * as homeSelectors from '../Home/selectors'
import * as homeActions from '../Home/actions'
import { getUser } from '../Header/selectors'
import RadioButton from '../../components/RadioButton'
import RecipientSelect from '../../components/RecipientSelect'
import ModalSelectRecipient from '../../components/ModalSelectRecipient'

class TradeConfirmation extends Component {
	constructor(props) {
		super(props)
		this.state={
			collapse : 4,
			checked: 'myself',
			modalRecipient: false,
			first_n_midle_name: 'Rizal',
			last_name: 'Sidik',
			account_no: '09889823',
			// iban: '111999',
			description: 'Untuk Saya',
			currencies: [],
			anonymous: false,
			selectedRecipient: '',
			recipients: [
				{
					id: 1,
					first_and_middle_name: 'Ismail Abdus',
					last_name: 'Shobar',
					account_no: '1234567890',
				},
				{
					id: 2,
					first_and_middle_name: 'Ismail Abdus',
					last_name: 'Shobar',
					account_no: '1234567890',
				},
			]
		}
	}
	componentWillMount() {
		this.getCurrencies()
		this.props.getPurpose()
	}

	getCurrencies = async() => {
		const response = await currenciesService.getCurrencies()
		const currencies = response.result
		this.setState({ currencies })
	}

	onPickTrade = (need_amount, have_amount) => {
		need_amount = convertMoneyString(need_amount)
		have_amount = convertMoneyString(have_amount)
		const zone_name =  moment.tz.guess()
		const timezone = moment.tz(zone_name)._z.name
		let payment_detail = {
			payment_type : 'manual_transfer',
			gross_amount: have_amount
		}
		let account_info = {
			account_no : this.state.account_no,
			iban :  '92ie9i29ei92ie92i9e2i9ei29ei92ei9'
		}
		let trade_with = []
		this.props.selectedTrade.forEach(trade => {
			trade_with.push(trade.id)
		})
		payment_detail = JSON.stringify(payment_detail)
		account_info = JSON.stringify(account_info)
		trade_with = JSON.stringify(trade_with)
		this.props.pickTrade(
			this.props.user.get('id'), need_amount, this.props.selectedTrade[0].have_currency,
			this.props.selectedTrade[0].currency_rate, have_amount, this.props.selectedTrade[0].need_currency, 
			payment_detail, this.props.selectedPurpose.get('text_purpose'),
			2048390.00, account_info, this.state.first_n_midle_name, this.state.last_name, this.state.description,
			trade_with, timezone
		)
	}

	renderStepOneComplete = (chooseNeed, amountNeed, chooseHave, amountHave) => {
		return(
			<Row>
				<div className="col col-md-auto d-flex no-right-padding">
					<img className=" tc-img " src={ chooseNeed.get('country_flag') } />
					<div className="line-height-4">
						<h2 className="font20 font-weight-bold text-secondary no-margin">{ chooseNeed.get('currency_alias') }</h2>
						<label className="font12 font-weight-bold text-primary no-margin">
							{ chooseNeed.get('currency_symbol') + ' ' }
							{ amountNeed }
						</label>
					</div>
				</div>
				<div className="col col-md-auto">
					<i className="right tran-c-arrow" />					
				</div>
				<div className="col col-md-auto d-flex no-left-padding">
					<img className=" tc-img " src={ chooseHave.get('country_flag') } />
					<div className="line-height-4">
						<h2 className="font20 font-weight-bold text-secondary no-margin">{ chooseHave.get('currency_alias') }</h2>
						<label className="font12 font-weight-bold text-primary no-margin">
							{ chooseHave.get('currency_symbol') + ' ' }
							{ amountHave }
						</label>
					</div>
				</div>
			</Row>
		)
	}

	renderStepTwoComplete = () => {
		return(
			<div className="d-flex font14 text-primary font-weight-bold align-items-center">
				<div className="tc-circle-recipient" />
				Ismail Abdus Shobar
			</div>
		)
	}
	
	renderStepThreeComplete = (purpose) => {
		return(
			<div className="font16 text-black-semi">
				{ strings.for + ' ' }
				<span className="font-weight-bold">
					{ purpose }
				</span>
			</div>
		)
	}



	render() {	
		const options = chunkArray(this.props.purpose, 'text_purpose', 'text_purpose', '')
		// let you_will_get = 0, you_transfer = 0
		// if(this.props.selectedTrade.length > 0){
		// 	you_will_get = this.props.selectedTrade[0].have_amount
		// 	if(this.props.selectedTrade[0].have_currency === 'IDR'){
		// 		you_will_get = Math.round(you_will_get)
		// 		you_will_get = accounting.formatMoney(you_will_get,'', 0, ',')
		// 	}else{
		// 		you_will_get = Math.round(you_will_get * 100) / 100
		// 		you_will_get = accounting.formatMoney(you_will_get,'', 2, ',')
		// 	}
		// 	you_transfer = this.props.selectedTrade[0].need_amount
		// 	if(this.props.selectedTrade[0].need_currency === 'IDR'){
		// 		you_transfer = Math.round(you_transfer)
		// 		you_transfer = accounting.formatMoney(you_transfer,'', 0, ',')
		// 	}else{
		// 		you_transfer = Math.round(you_transfer * 100) / 100
		// 		you_transfer = accounting.formatMoney(you_transfer,'', 2, ',')
		// 	}
		// }
		
		if(!this.props.location.state){
			return <Redirect to="/" />
		}

		// const { type } = this.props.location.state
		const { collapse } = this.state

		let currency_symbol = this.props.chooseHave.get('currency_symbol')
		let fixed_cost = formatMoney(this.props.chooseHave.get('fixed_cost'), this.props.chooseHave.get('currency_alias'))
		let cost = (convertMoneyString(this.props.amountHave) * 0.05 / 100) + convertMoneyString(fixed_cost)
		let total_transfer = convertMoneyString(this.props.amountHave) + cost

		return (
			<div className="container dashboard-container">
				<Row className="justify-content-center">
					<div className="col col-md-8">
						<label className="font14 text-secondary clickable">{ strings.cancel }</label>
						{/*	step 1 form input money	*/}
						<Step
							active={ collapse === 1 }
							onNextClick={ () => this.setState({ collapse: this.state.collapse + 1 }) }							
							theme="top"
							title={ strings.create_post }
							pass={ collapse > 1 }
							renderOnComplete={ this.renderStepOneComplete(
								this.props.chooseNeed,
								this.props.amountNeed,
								this.props.chooseHave,
								formatMoney(total_transfer, this.props.chooseHave.get('currency_alias'))
							) }
						>
							<FormInputMoney
								theme="confirmation"
								selectedNeed={ this.props.chooseNeed }
								selectedHave={ this.props.chooseHave }
								onSelectNeed={ (chooseNeed) => this.props.setChooseNeed(chooseNeed) }
								onSelectHave={ (chooseHave) => this.props.setChooseHave(chooseHave) }
								amountNeed={ this.props.amountNeed }
								amountHave={ this.props.amountHave }
								onChangeNeed={ (amountNeed) => this.props.setAmountNeed(amountNeed) }
								onChangeHave={ (amountHave) => this.props.setAmountHave(amountHave) }
								convertMoney={ (val, selectedNeed, selectedHave, type) => this.props.convertMoney(val, selectedNeed, selectedHave, type) }
								onStartTrading={ () => this.onStartTrading() }
								buttonDisabled={ this.props.loading }
								setLoading={ (loading) => this.props.setLoading(loading) }
								currencies={ this.state.currencies }
							/>
							<Row className="no-margin">
								<div className="col p_line">
									<label className="font12 font-weight-bold full-width no-margin">{ strings.kotuka_fee }</label>
									<label className="font16 font-weight-bold full-width no-margin text-primary">
										{ currency_symbol + ' ' }
										{ this.props.loading ? '...' : formatMoney(cost, this.props.chooseHave.get('currency_alias')) }
									</label>
									<label className="font12 font-weight-bold full-width no-margin text-secondary">
										{ strings.fee_percent } 
										{ currency_symbol + ' ' }
										{ fixed_cost }
									</label>
								</div>
								<div className="col p_line text-right">
									<label className="font12 font-weight-bold full-width no-margin">{ strings.total_transfer }</label>
									<label className="font16 font-weight-bold full-width no-margin text-primary">
										{ currency_symbol + ' ' }
										{ this.props.loading ? '...' : formatMoney(total_transfer, this.props.chooseHave.get('currency_alias')) }
									</label>
									<label className="font12 font-weight-bold full-width no-margin text-secondary">
										{ this.props.chooseHave.get('currency_symbol') + ' 1 = ' }
										{ this.props.chooseNeed.get('currency_symbol') + ' ' }
										{this.props.loading ? '...' : accounting.formatMoney(this.props.rate, '', this.props.chooseHave.get('currency_alias') === 'IDR' ? 7 : 2)}
									</label>
									<label className="font12 font-weight-bold full-width no-margin text-gray-80">{ strings.guaranted_rate }</label>
								</div>
							</Row>
							<Row className="no-margin">
								<div className="col col-md-12">
									<label className="font14 font-weight-bold full-width">{ strings.privacy_selection }</label>
									<RadioButton className="no-bottom-margin" name="anonymous" checked={ !this.state.anonymous } label={ strings.show_my_name } onClick={ () => this.setState({ anonymous: false }) } />
									<RadioButton name="anonymous" checked={ this.state.anonymous } label={ strings.anon } onClick={ () => this.setState({ anonymous: true }) } />
								</div>
							</Row>
						</Step>
						{/* {input recipient} */}
						<Step
							active={ collapse === 2 }
							onNextClick={ () => this.setState({ collapse: this.state.collapse + 1 }) }												
							onEditClick={ () => this.setState({ collapse : 2 }) }							
							title={ strings.recipient }
							pass={ collapse > 2 }
							disabledNext={ this.state.selectedRecipient === '' }				
							renderOnComplete={ this.renderStepTwoComplete() }
						>
							<label className="font14 font-weight-bold text-black-semi">{ strings.who_are_you_sending_money_to }</label>
							<Row className="sr-row">
								<RecipientSelect
									title={ strings.myself }
									active={ this.state.selectedRecipient === 'myself' }
									onClick={ () => this.setState({ selectedRecipient: 'myself', modalRecipient: true }) }
								/>
								<RecipientSelect
									title={ strings.someone_else }
									active={ this.state.selectedRecipient === 'else' }
									onClick={ () => this.setState({ selectedRecipient: 'else', modalRecipient: true }) }
								/>
								<RecipientSelect
									title={ strings.business_charity }
									active={ this.state.selectedRecipient === 'business' }
									onClick={ () => this.setState({ selectedRecipient: 'business', modalRecipient: true }) }
								/>
							</Row>
							<div className="p_line">
								<div className="font16 font-weight-bold text-primary">{ strings.bank_account }</div>
								<div className="font14 text-black-semi">{ 'Ismail Abdus Shobar' }</div>
								<div className="font14 text-black-semi">{ '77218210022' }</div>
							</div>
						</Step>
						{/* {purpose} */}
						<Step
							active={ collapse === 3 }
							onNextClick={ () => this.setState({ collapse: this.state.collapse + 1 }) }
							onEditClick={ () => this.setState({ collapse : 3 }) }					
							title={ strings.purpose }
							pass={ collapse > 3 }
							renderOnComplete={ this.renderStepThreeComplete( this.props.selectedPurpose.get('text_purpose') ) }							
						>
							<label className="font14 font-weight-bold text-black-semi">{ strings.what_purpose }</label>	
							<Select
								name="form-field-name"
								value={ this.props.selectedPurpose.get('text_purpose') }
								clearable={ false }
								onChange={ (val) => this.props.setSelectedPurpose(val) }
								autosize={ false }
								options={ options }
							/>						
						</Step>
						{/* {review} */}
						<Step
							active={ collapse === 4 }
							title={ strings.review }
							theme="bottom"
						>
							<label className="font16 font-weight-semi-bold text-black-semi">{ strings.transfer_detail }</label>	
							<div className="tc-white-row no-margin">
								<table className="p_line full-width">
									<tbody>
										{/* {amount to convert} */}
										<tr>
											<td className="tc-td font14 text-black-semi">{ strings.amount_to_convert } <br /> 
												<span className="font12 text-gray">
													{ strings.guaranted_rate + ' '  }
													{ this.props.chooseHave.get('currency_symbol') + ' 1 = ' }
													{ this.props.chooseNeed.get('currency_symbol') + ' ' }
													{this.props.loading ? '...' : accounting.formatMoney(this.props.rate, '', this.props.chooseHave.get('currency_alias') === 'IDR' ? 7 : 2)}
												</span>
											</td>
											<td className="tc-td font16 text-primary text-right">
												{ this.props.chooseHave.get('currency_symbol') + ' ' }
												{ this.props.amountHave }
											</td>
										</tr>
										{/* {kotuka fee} */}
										<tr>
											<td className="tc-td font14 text-black-semi">{ strings.kotuka_fee } <br /> 
												<span className="font12 text-gray">
													({ strings.fee_percent + ' '  }
													{ currency_symbol + ' ' }
													{ fixed_cost })
												</span>
											</td>
											<td className="tc-td font16 text-primary text-right">
												{ this.props.chooseHave.get('currency_symbol') + ' ' }
												{ this.props.loading ? '...' : formatMoney(cost, this.props.chooseHave.get('currency_alias')) }
											</td>
										</tr>
										{/* { have to transfer } */}
										<tr>
											<td className="tc-td font14 text-black-semi font-weight-bold">{ strings.you_have_to_transfer }</td>
											<td className="tc-td font16 text-primary text-right font-weight-bold">
												{ this.props.chooseHave.get('currency_symbol') + ' ' }
												{ this.props.loading ? '...' : formatMoney(total_transfer, this.props.chooseHave.get('currency_alias')) }												
											</td>
										</tr>
										{/* { you will get } */}
										<tr>
											<td className="tc-td font14 text-black-semi font-weight-bold">{ strings.will_get }</td>
											<td className="tc-td font16 text-primary text-right font-weight-bold">
												{ this.props.chooseNeed.get('currency_symbol') + ' ' }
												{ this.props.amountNeed }												
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</Step>
					</div>
				</Row>
				<ModalSelectRecipient
					open={ this.state.modalRecipient }
					recipients={ this.state.recipients }
					onClose={ () => this.setState({ modalRecipient: false }) }
				/>
			</div>
		)
	}
}

TradeConfirmation.propTypes = {
	purpose: PropTypes.any,
	selectedPurpose: PropTypes.object,
	user: PropTypes.object,
	location: PropTypes.object,
	//home selectors
	selectedTrade: PropTypes.any,
	chooseNeed: PropTypes.object,
	chooseHave: PropTypes.object,
	amountNeed: PropTypes.string,
	amountHave: PropTypes.string,
	loading: PropTypes.bool,
	amountHaveInt: PropTypes.number,	
	rate: PropTypes.number,	
	//funct
	getPurpose: PropTypes.func,
	setSelectedPurpose: PropTypes.func,
	pickTrade: PropTypes.func,
	//home functions
	setAmountNeed: PropTypes.func,
	setAmountHave: PropTypes.func,
	setChooseNeed: PropTypes.func,
	setChooseHave: PropTypes.func,
	setLoading: PropTypes.func,	
	convertMoney: PropTypes.func,	
}

const mapStateToProps = createStructuredSelector({
	purpose: selectors.getPurpose(),
	selectedPurpose: selectors.getSelectedPurpose(),
	user: getUser(),
	//home data
	loading: homeSelectors.getLoading(),
	amountNeed: homeSelectors.getAmountNeed(),
	amountHave: homeSelectors.getAmountHave(),
	chooseNeed: homeSelectors.getChooseNeed(),
	chooseHave: homeSelectors.getChooseHave(),
	selectedTrade: homeSelectors.getSelectedTrades(),
	amountHaveInt: homeSelectors.getAmountHaveInt(),
	rate: homeSelectors.getRate()
	// chooseNeed: homeSelectors.
})

const mapDispatchToProps = (dispatch) => ({
	getPurpose: () => dispatch(actions.getPurpose()),
	setSelectedPurpose: (selectedPurpose) => dispatch(actions.setSelectedPurpose(selectedPurpose)),
	pickTrade : (
		id_user, need_amount, need_currency, 
		currency_rate, have_amount, have_currency, 
		payment_detail, trade_purpose, total_amount_transfer,
		account_info, first_and_middle_name, last_name,
		description, trade_with, timezone) => dispatch(actions.pickTrade(
		id_user, need_amount, need_currency, 
		currency_rate, have_amount, have_currency, 
		payment_detail, trade_purpose, total_amount_transfer,
		account_info, first_and_middle_name, last_name,
		description, trade_with, timezone)),
	//homeactions
	setAmountNeed:(amountNeed) => dispatch(homeActions.setAmountNeed(amountNeed)),
	setAmountHave: (amountHave) => dispatch(homeActions.setAmountHave(amountHave)),
	setChooseNeed: (chooseNeed) => dispatch(homeActions.setChooseNeed(chooseNeed)),
	setChooseHave: (chooseHave) => dispatch(homeActions.setChooseHave(chooseHave)),	
	setLoading: (loading) => dispatch(homeActions.setLoading(loading)),
	convertMoney: (val, selectedNeed, selectedHave, type) => dispatch(homeActions.convertMoney(val, selectedNeed, selectedHave, type)),	
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeConfirmation)