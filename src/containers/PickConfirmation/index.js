import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './../TradeConfirmation/selectors'
import * as actions from './../TradeConfirmation/actions'
import PropTypes from 'prop-types'
import accounting from 'accounting'
import currenciesService from '../../services/currencies'
import Select from 'react-select-plus'
import moment from 'moment-timezone'
import { Redirect } from 'react-router-dom'

import Row from '../../components/Row'
import Step from '../../components/Step'

import './style.scss'
import strings from '../../localizations'
import { chunkArray, convertMoneyString, formatMoney, getCostFromCurrency, getFlagFromCurrency, bankFilter, getPercentFromCurrency } from '../../services/helper'
import * as homeSelectors from '../Home/selectors'
import * as homeActions from '../Home/actions'
import { getUser } from '../Header/selectors'
import RecipientSelect from '../../components/RecipientSelect'
import ModalSelectRecipient from '../../components/ModalSelectRecipient'
import { getRecipients } from '../Recipient/actions'
import * as recipientSelectors from '../Recipient/selectors'
import history from './../../history'
import ModalIdCard from '../../components/ModalIdCard'
import TradeCard from '../../components/TradeCard'
import getSymbolFromCurrency from 'currency-symbol-map'
import Bank from '../../components/Bank'



class TradeConfirmation extends Component {
	constructor(props) {
		super(props)
		this.state={
			collapse : 1,
			checked: 'myself',
			modalRecipient: false,
			currencies: [],
			anonymous: false,
			selectedRecipient: '',
			recipient: {
				type: ''
			},
			payment: '',
			bank_name: '',
			// upload identification photo
			modalUploadIdCard: false,
			imagePreviewUrl: '',
			file: null,
			paymentInfo: null
		}
	}
	componentWillMount() {
		this.getCurrencies()
		this.props.getPurpose()
		this.props.getRecipients(this.props.user.get('id'))
		this.props.setLoading(false)
		this.props.getAccounts()		
	}

	getCurrencies = async() => {
		const response = await currenciesService.getCurrencies()
		const currencies = response.result
		this.setState({ currencies })
	}

	onPickTrade = () => {
		let need_amount = convertMoneyString(this.props.selectedTrade[0].have_amount)
		let have_amount = convertMoneyString(this.props.selectedTrade[0].need_amount)
		const zone_name =  moment.tz.guess()
		const timezone = moment.tz(zone_name)._z.name
		let payment_detail = {
			payment_type : this.state.payment,
			gross_amount: have_amount,
			bank_name: this.state.bank_name,
			paymentInfo: this.state.paymentInfo,
		}

		let trade_with = []
		this.props.selectedTrade.forEach(trade => {
			trade_with.push(trade.id)
		})

		payment_detail = JSON.stringify(payment_detail)
		trade_with = JSON.stringify(trade_with)

		const payload = {
			id_user: this.props.user.get('id'),
			need_amount: need_amount,
			need_currency: this.props.selectedTrade[0].have_currency, 
			currency_rate: this.props.selectedTrade[0].currency_rate, 
			have_amount: have_amount,
			have_currency: this.props.selectedTrade[0].need_currency,
			payment_detail: payment_detail,
			id_purpose: this.props.selectedPurpose.get('id'),
			id_recipient: this.state.recipient.id,
			trade_with: trade_with,
			timezone
		}
		this.props.postTrade(payload)
	}

	renderStepOneComplete = (chooseNeed, amountNeed, chooseHave, amountHave) => {
		return(
			<Row>
				<div className="col col-md-auto d-flex no-right-padding">
					<img className=" tc-img " src={ getFlagFromCurrency(this.state.currencies, chooseNeed) } />
					<div className="line-height-4">
						<h2 className="font20 font-weight-bold text-secondary no-margin">{ chooseNeed }</h2>
						<label className="font12 font-weight-bold text-primary no-margin">
							{ getSymbolFromCurrency(chooseNeed) + ' ' }
							{ amountNeed }
						</label>
					</div>
				</div>
				<div className="col col-md-auto">
					<i className="right tran-c-arrow" />					
				</div>
				<div className="col col-md-auto d-flex no-left-padding">
					<img className=" tc-img " src={ getFlagFromCurrency(this.state.currencies, chooseHave) } />
					<div className="line-height-4">
						<h2 className="font20 font-weight-bold text-secondary no-margin">{ chooseHave }</h2>
						<label className="font12 font-weight-bold text-primary no-margin">
							{ getSymbolFromCurrency(chooseHave) + ' ' }
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
				{ this.state.recipient.first_and_middle_name + ' ' + this.state.recipient.last_name }
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

	renderStepFourComplete = () => {
		return(
			<div className="d-flex font14 text-primary font-weight-bold align-items-center">
				<div className="tc-circle-recipient" />
				{ strings.transfer_with + ' ' + this.state.bank_name }
			</div>
		)
	}

	onSelectedRecipient = (recipient) => {
		recipient = {
			...recipient,
			type: this.state.selectedRecipient
		}
		this.setState({ recipient, modalRecipient: false })
	}

	checkIdentification = () => {
		if(this.props.user.get('identification_photo')){
			this.onPickTrade()
		}else{
			this.setState({ modalUploadIdCard: true })
		}
	}

	handleImageChange = (e) => {
		e.preventDefault()
		let reader = new FileReader()
		let file = e.target.files[0]
		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result
			})
		}
		reader.readAsDataURL(file)
	}

	onSendImage = async() => {
		const payload = {
			identification: this.state.file, 
			id: this.props.user.get('id')
		}
		const res = await this.props.uploadIdCard(payload)
		if(res){
			this.setState({ modalUploadIdCard: false })
			this.onPickTrade()
		}
	}



	render() {
		const options = chunkArray(this.props.purpose, 'text_purpose', 'text_purpose', '')
		if(!this.props.location.state){
			return <Redirect to="/" />
		}

		// const { type } = this.props.location.state
		const { collapse } = this.state

		let currency_symbol = getSymbolFromCurrency(this.props.selectedTrade[0].need_currency)
		let fixed_cost = formatMoney(getCostFromCurrency(this.state.currencies, this.props.selectedTrade[0].need_currency), this.props.selectedTrade[0].need_currency)
		let cost = (convertMoneyString(this.props.selectedTrade[0].need_amount) * 0.5 / 100) + convertMoneyString(fixed_cost)
		let total_transfer = convertMoneyString(this.props.selectedTrade[0].need_amount) + cost

		const bank = bankFilter(this.props.accounts, this.props.selectedTrade[0].need_currency)		

		return (
			<div className="container dashboard-container">
				<Row className="justify-content-center">
					<div className="col col-md-8">
						<label className="font14 text-secondary clickable" onClick={ () => history.replace('/dashboard/post') }>{ strings.cancel }</label>




						{/*	step 1 form input money	*/}
						<Step
							active={ collapse === 1 }
							onNextClick={ () => this.setState({ collapse: this.state.collapse + 1 }) }							
							theme="top"
							title={ strings.pick }
							pass={ collapse > 1 }
							renderOnComplete={ this.renderStepOneComplete(
								this.props.selectedTrade[0].have_currency,
								formatMoney(this.props.selectedTrade[0].have_amount, this.props.selectedTrade[0].have_currency),
								this.props.selectedTrade[0].need_currency,
								formatMoney(total_transfer, this.props.selectedTrade[0].need_currency)
							) }
						>
							<label className="font14 font-weight-bold text-black-semi">{ strings.you_are_trading }</label>
							<Row>
								{
									this.props.selectedTrade && this.props.selectedTrade.map((trade, tradeIndex) => {
										return(
											<TradeCard
												key={ tradeIndex }
												data={ trade }
												anonymous={ trade.anonymous }
												withoutSelect
											/>
										)
									})
								}					
							</Row>
							<Row>
								<div className="col p_line">
									<label className="font12 font-weight-bold full-width no-margin">{ strings.kotuka_fee }</label>
									<label className="font16 font-weight-bold full-width no-margin text-primary">
										{ currency_symbol + ' ' }
										{ formatMoney(cost, this.props.selectedTrade[0].need_currency) }
									</label>
									<label className="font12 font-weight-bold full-width no-margin text-secondary">
										{ parseFloat(getPercentFromCurrency(this.state.currencies, this.props.selectedTrade[0].need_currency)) + strings.fee_percent } 
										{ currency_symbol + ' ' }
										{ fixed_cost }
									</label>
								</div>
								<div className="col p_line text-right">
									<label className="font12 font-weight-bold full-width no-margin">{ strings.total_transfer }</label>
									<label className="font16 font-weight-bold full-width no-margin text-primary">
										{ currency_symbol + ' ' }
										{ formatMoney(total_transfer, this.props.selectedTrade[0].need_currency) }
									</label>
									<label className="font12 font-weight-bold full-width no-margin text-secondary">
										{ getSymbolFromCurrency(this.props.selectedTrade[0].have_currency) + ' 1 = ' }
										{ getSymbolFromCurrency(this.props.selectedTrade[0].need_currency) + ' ' }
										{ accounting.formatMoney(this.props.selectedTrade[0].currency_rate, '', this.props.selectedTrade[0].have_currency === 'IDR' ? 7 : 2)}
									</label>
									<label className="font12 font-weight-bold full-width no-margin text-gray-80">{ strings.guaranted_rate }</label>
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
									active={ this.state.recipient.type === 'myself' }
									onClick={ () => this.setState({ selectedRecipient: 'myself', modalRecipient: true }) }
								/>
								<RecipientSelect
									title={ strings.someone_else }
									active={ this.state.recipient.type === 'else' }
									onClick={ () => this.setState({ selectedRecipient: 'else', modalRecipient: true }) }
								/>
								<RecipientSelect
									title={ strings.business_charity }
									active={ this.state.recipient.type === 'business' }
									onClick={ () => this.setState({ selectedRecipient: 'business', modalRecipient: true }) }
								/>
							</Row>
							{
								this.state.recipient.hasOwnProperty('id') &&
								<div className="p_line">
									<div className="font16 font-weight-bold text-primary">{ strings.bank_account }</div>
									<div className="font14 text-black-semi">{ this.state.recipient.first_and_middle_name + ' ' + this.state.recipient.last_name }</div>
									<div className="font14 text-black-semi">{ this.state.recipient.Recipient ? this.state.recipient.Recipient.account_no : '' }</div>
								</div>
							}
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


						{/* { Transfer Method } */}
						<Step
							active={ collapse === 4 }
							onNextClick={ () => this.setState({ collapse: this.state.collapse + 1 }) }												
							onEditClick={ () => this.setState({ collapse : 4 }) }							
							title={ strings.transfer_mehtod }
							pass={ collapse > 4 }
							renderOnComplete={ this.renderStepFourComplete() }
							disabledNext={ this.state.payment === '' }
						>
							<label className="font14 font-weight-bold text-black-semi">{ strings.how_you_want_transfer }</label>
							<Row className="sr-row no-margin">
								{
									bank.map((b, idx) => {
										return(
											<Bank key={ idx } img={ b.bank_image } onClick={ () => this.setState({ payment: b.transfer_type, bank_name: b.bank_name, paymentInfo: b }) } selected={ this.state.payment === b.transfer_type } />
										)
									})
								}
							</Row>
						</Step>











						{/* {review} */}
						<Step
							active={ collapse === 5 }
							title={ strings.review }
							theme="bottom"
							onConfirmClick={ this.checkIdentification }
							loading={ this.props.loading }
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
													{ getSymbolFromCurrency(this.props.selectedTrade[0].have_currency) + ' 1 = ' }
													{ getSymbolFromCurrency(this.props.selectedTrade[0].need_currency) + ' ' }
													{ accounting.formatMoney(this.props.selectedTrade[0].currency_rate, '', this.props.selectedTrade[0].have_currency === 'IDR' ? 7 : 2)}
												</span>
											</td>
											<td className="tc-td font16 text-primary text-right">
												{ getSymbolFromCurrency(this.props.selectedTrade[0].need_currency) + ' ' }
												{ formatMoney(this.props.selectedTrade[0].need_amount, this.props.selectedTrade[0].need_currency) }
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
												{ getSymbolFromCurrency(this.props.selectedTrade[0].need_currency) + ' ' }
												{ formatMoney(cost, this.props.selectedTrade[0].need_currency) }
											</td>
										</tr>
										{/* { have to transfer } */}
										<tr>
											<td className="tc-td font14 text-black-semi font-weight-bold">{ strings.you_have_to_transfer }</td>
											<td className="tc-td font16 text-primary text-right font-weight-bold">
												{ getSymbolFromCurrency(this.props.selectedTrade[0].need_currency) + ' ' }
												{ formatMoney(total_transfer, this.props.selectedTrade[0].need_currency) }												
											</td>
										</tr>
										{/* { you will get } */}
										<tr>
											<td className="tc-td font14 text-black-semi font-weight-bold">{ strings.will_get }</td>
											<td className="tc-td font16 text-primary text-right font-weight-bold">
												{ getSymbolFromCurrency(this.props.selectedTrade[0].have_currency) + ' ' }
												{ formatMoney(this.props.selectedTrade[0].have_amount) }											
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
					onClose={ () => this.setState({ modalRecipient: false }) }
					recipients={ this.props.recipients || [] }
					onSelectedRecipient={ (recipient) => this.onSelectedRecipient(recipient) }
					currency={ this.props.selectedTrade[0].have_currency }
					type={ this.state.selectedRecipient }
				/>
				<ModalIdCard
					open={ this.state.modalUploadIdCard }
					onButtonClick = { () => this.upload.click() }
					imagePreviewUrl={ this.state.imagePreviewUrl }
					onClose={ () => this.setState({ modalUploadIdCard: false }) }
					onSendImage={ this.onSendImage }
					loading={ this.props.loading }
				/>
				<input 
					id="file"
					type="file"
					accept="image/*"
					ref={ (ref) => this.upload = ref }
					onChange={ (e) => this.handleImageChange(e) }
					className="d-none"
				/>
			</div>
		)
	}
}

TradeConfirmation.propTypes = {
	purpose: PropTypes.any,
	accounts: PropTypes.any,
	selectedPurpose: PropTypes.object,
	user: PropTypes.object,
	location: PropTypes.object,
	loading: PropTypes.bool,
	//home selectors
	selectedTrade: PropTypes.any,
	chooseNeed: PropTypes.object,
	chooseHave: PropTypes.object,
	amountNeed: PropTypes.string,
	amountHave: PropTypes.string,
	homeLoading: PropTypes.bool,
	amountHaveInt: PropTypes.number,	
	rate: PropTypes.number,	
	//recipient selector
	recipients: PropTypes.any,
	//funct
	getPurpose: PropTypes.func,
	getAccounts: PropTypes.func,
	setSelectedPurpose: PropTypes.func,
	pickTrade: PropTypes.func,
	postTrade: PropTypes.func,
	uploadIdCard: PropTypes.func,
	//home functions
	setHomeLoading: PropTypes.func,
	setAmountNeed: PropTypes.func,
	setAmountHave: PropTypes.func,
	setChooseNeed: PropTypes.func,
	setChooseHave: PropTypes.func,
	setLoading: PropTypes.func,	
	convertMoney: PropTypes.func,
	// recipient function
	getRecipients: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
	purpose: selectors.getPurpose(),
	accounts: selectors.getAccounts(),
	selectedPurpose: selectors.getSelectedPurpose(),
	user: getUser(),
	loading: selectors.getLoading(),
	//home data
	amountNeed: homeSelectors.getAmountNeed(),
	amountHave: homeSelectors.getAmountHave(),
	chooseNeed: homeSelectors.getChooseNeed(),
	chooseHave: homeSelectors.getChooseHave(),
	selectedTrade: homeSelectors.getSelectedTrades(),
	amountHaveInt: homeSelectors.getAmountHaveInt(),
	rate: homeSelectors.getRate(),
	homeLoading: homeSelectors.getLoading(),
	// chooseNeed: homeSelectors.
	//recipient data
	recipients: recipientSelectors.getRecipients()
})

const mapDispatchToProps = (dispatch) => ({
	getPurpose: () => dispatch(actions.getPurpose()),
	setSelectedPurpose: (selectedPurpose) => dispatch(actions.setSelectedPurpose(selectedPurpose)),
	postTrade : (payload) => dispatch(actions.postTrade(payload)),
	uploadIdCard: (payload) => dispatch(actions.uploadIdCard(payload)),
	setLoading: (loading) => dispatch(actions.setLoading(loading)),
	//homeactions
	setHomeLoading: (loading) => dispatch(homeActions.setLoading(loading)),
	setAmountNeed:(amountNeed) => dispatch(homeActions.setAmountNeed(amountNeed)),
	setAmountHave: (amountHave) => dispatch(homeActions.setAmountHave(amountHave)),
	setChooseNeed: (chooseNeed) => dispatch(homeActions.setChooseNeed(chooseNeed)),
	setChooseHave: (chooseHave) => dispatch(homeActions.setChooseHave(chooseHave)),	
	convertMoney: (val, selectedNeed, selectedHave, type) => dispatch(homeActions.convertMoney(val, selectedNeed, selectedHave, type)),	
	getRecipients: (id) => dispatch(getRecipients(id)),
	getAccounts: () => dispatch(actions.getAccounts())
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeConfirmation)