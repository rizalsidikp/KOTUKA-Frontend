import React, { Component } from 'react'
import Banner from '../../components/Banner'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './selectors'
import * as actions from './actions'
import PropTypes from 'prop-types'
import { convertMoneyString } from './../../services/helper'

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

	onStartTrading = () => {
		const payload = {
			need: this.props.chooseNeed,
			have: this.props.chooseHave,
			amount: convertMoneyString(this.props.amountNeed)
		}
		this.props.getClosestTrade(payload)
	}

	componentWillMount() {
		this.props.setInitialState()
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
							convertMoney={ (val, selectedNeed, selectedHave) => this.props.convertMoney(val, selectedNeed, selectedHave) }
							onStartTrading={ this.onStartTrading }
							buttonDisabled={ this.props.loading }
							setLoading={ (loading) => this.props.setLoading(loading) }
						/>
						<TradeBox 
							closestTrade={ this.props.closestTrade }
							selectedTrades={ this.props.selectedTrades }
							onSelectTrade={ (trade) => this.props.tradeSelected(this.props.selectedTrades, trade) }
							onRemoveTrade={ (index) => this.props.removeTrade(this.props.selectedTrades, index) }
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
	chooseNeed: PropTypes.string,
	chooseHave: PropTypes.string,
	closestTrade: PropTypes.any,
	selectedTrades: PropTypes.array,
	//function
	setInitialState: PropTypes.func,
	setAmountNeed: PropTypes.func,
	setAmountHave: PropTypes.func,
	setChooseNeed: PropTypes.func,
	setChooseHave: PropTypes.func,
	getClosestTrade: PropTypes.func,
	convertMoney: PropTypes.func,
	setLoading: PropTypes.func,
	tradeSelected: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.getLoading(),
	amountNeed: selectors.getAmountNeed(),
	amountHave: selectors.getAmountHave(),
	chooseNeed: selectors.getChooseNeed(),
	chooseHave: selectors.getChooseHave(),
	closestTrade: selectors.getClosestTrade(),
	selectedTrades: selectors.getSelectedTrades()
})

const mapDispatchToProps = (dispatch) => ({
	setInitialState: () => dispatch(actions.setInitialState()),
	setAmountNeed:(amountNeed) => dispatch(actions.setAmountNeed(amountNeed)),
	setAmountHave: (amountHave) => dispatch(actions.setAmountHave(amountHave)),
	setChooseNeed: (chooseNeed) => dispatch(actions.setChooseNeed(chooseNeed)),
	setChooseHave: (chooseHave) => dispatch(actions.setChooseHave(chooseHave)),
	getClosestTrade: (payload) => dispatch(actions.getClosestTrade(payload)),
	setLoading: (loading) => dispatch(actions.setLoading(loading)),
	convertMoney: (val, selectedNeed, selectedHave) => dispatch(actions.convertMoney(val, selectedNeed, selectedHave)),
	tradeSelected: (selectedTrades, trade) => dispatch(actions.tradeSelected(selectedTrades, trade)),
	removeTrade: (selectedTrades, index) => dispatch(actions.removeTrade(selectedTrades, index))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)