import React, { Component } from 'react'
import Banner from '../../components/Banner'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './selectors'
import * as actions from './actions'
import PropTypes from 'prop-types'
import { convertMoneyString } from './../../services/helper'
import currenciesService from '../../services/currencies'


import './style.scss'
import FormInputMoney from './../../components/FormInputMoney'
import strings from '../../localizations'
import Row from '../../components/Row'
import Ilustration from '../../components/Ilustration'
import Faq from '../../components/Faq'
import AboutUs from '../../components/AboutUs'
import Footer from '../../components/Footer'
import TradeBox from '../../components/TradeBox'

class Home  extends Component {

	constructor(props) {
		super(props)
		this.state = {
			currencies: []
		}
	}

	componentWillMount() {
		this.setInitial()
		this.getCurrencies()		
	}

	getCurrencies = async() => {
		const response = await currenciesService.getCurrencies()
		const currencies = response.result
		this.setState({ currencies })
	}

	onStartTrading = async(page = 1) => {
		await this.props.setAmountNeedInt(convertMoneyString(this.props.amountNeed) || 0)
		await this.props.setAmountHaveInt(convertMoneyString(this.props.amountHave) || 0)
		const	need = this.props.chooseNeed.get('currency_alias')
		const	have =  this.props.chooseHave.get('currency_alias')
		this.props.getClosestTrade(need, have, this.props.amountNeedInt, this.props.amountHaveInt, page)
	}

	
	setInitial = async() => {
		await this.props.setInitialState()
	}


	
	render() {
		return (
			<div>
				<div className="container-fluid background-secondary">
					<div className="container home-container">
						<Banner />
						<FormInputMoney
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
							buttonText={ this.props.closestTrade && this.props.closestTrade.length > 0 ? strings.search_again : strings.get_start }
						/>
						<TradeBox 
							closestTrade={ this.props.closestTrade }
							selectedTrades={ this.props.selectedTrades }
							onSelectTrade={ (trade) => this.props.tradeSelected(this.props.selectedTrades, trade) }
							onRemoveTrade={ (index) => this.props.removeTrade(this.props.selectedTrades, index) }
							loading={ this.props.isGettingTrade }
							isSearching={ this.props.isSearching }
							detailPage={ this.props.detailPage }
							currencies={ this.state.currencies }							
							onStartTrading={ (page) => this.onStartTrading(page) }		
						/>
					</div>
				</div>
				<h2 className="font24 text-secondary font-weight-bold text-center home-h2">{ strings.best_way }</h2>
				<Row>
					<span className="font20 text-gray font-weight-semi-bold mx-auto home-curr">{ strings.trading_currency }</span>
				</Row>
				<Ilustration title="Completely Secure" subtitle="Completely Secure" />
				<Ilustration title="Under 24 Hour Transaction" subtitle="Under 24 Hour Transaction" reverse={ true } />
				<Ilustration title="Easy To Use" subtitle="Easy To Use" />
				<Faq />
				<AboutUs />
				<Footer />
			</div>
		)
	}
}

Home.propTypes = {
	loading: PropTypes.bool,
	amountNeed: PropTypes.string,
	amountHave: PropTypes.string,
	amountNeedInt: PropTypes.number,
	amountHaveInt: PropTypes.number,
	chooseNeed: PropTypes.object,
	chooseHave: PropTypes.object,
	closestTrade: PropTypes.any,
	selectedTrades: PropTypes.any,
	isSearching: PropTypes.bool,
	detailPage: PropTypes.object,
	isGettingTrade: PropTypes.bool,
	rate: PropTypes.number,
	//function
	setInitialState: PropTypes.func,
	setAmountNeed: PropTypes.func,
	setAmountHave: PropTypes.func,
	setAmountNeedInt: PropTypes.func,
	setAmountHaveInt: PropTypes.func,
	setChooseNeed: PropTypes.func,
	setChooseHave: PropTypes.func,
	getClosestTrade: PropTypes.func,
	convertMoney: PropTypes.func,
	setLoading: PropTypes.func,
	tradeSelected: PropTypes.func,
	removeTrade: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.getLoading(),
	amountNeed: selectors.getAmountNeed(),
	amountHave: selectors.getAmountHave(),
	amountNeedInt: selectors.getAmountNeedInt(),
	amountHaveInt: selectors.getAmountHaveInt(),
	chooseNeed: selectors.getChooseNeed(),
	chooseHave: selectors.getChooseHave(),
	closestTrade: selectors.getClosestTrade(),
	selectedTrades: selectors.getSelectedTrades(),
	detailPage: selectors.getDetailPage(),
	isSearching: selectors.getIsSearching(),
	isGettingTrade: selectors.getIsGettingTrade(),
	rate: selectors.getRate()
})

const mapDispatchToProps = (dispatch) => ({
	setInitialState: () => dispatch(actions.setInitialState()),
	setAmountNeed:(amountNeed) => dispatch(actions.setAmountNeed(amountNeed)),
	setAmountHave: (amountHave) => dispatch(actions.setAmountHave(amountHave)),
	setAmountNeedInt:(amountNeedInt) => dispatch(actions.setAmountNeedInt(amountNeedInt)),
	setAmountHaveInt: (amountHaveInt) => dispatch(actions.setAmountHaveInt(amountHaveInt)),
	setChooseNeed: (chooseNeed) => dispatch(actions.setChooseNeed(chooseNeed)),
	setChooseHave: (chooseHave) => dispatch(actions.setChooseHave(chooseHave)),
	getClosestTrade: (need, have, amount, transfer, page) => dispatch(actions.getClosestTrade(need, have, amount, transfer, page)),
	setLoading: (loading) => dispatch(actions.setLoading(loading)),
	convertMoney: (val, selectedNeed, selectedHave, type) => dispatch(actions.convertMoney(val, selectedNeed, selectedHave, type)),
	tradeSelected: (selectedTrades, trade) => dispatch(actions.tradeSelected(selectedTrades, trade)),
	removeTrade: (selectedTrades, index) => dispatch(actions.removeTrade(selectedTrades, index))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)