import React, { Component } from 'react'
import PropTypes from 'prop-types'
import accounting from 'accounting'
import getSymbolFromCurrency from 'currency-symbol-map'


import Row from '../Row'
import './style.scss'
import strings from '../../localizations'
import TradeCard from '../TradeCard'
import Pagination from '../Pagination'
import Loading from '../Loading'

class TradeBox extends Component {
	render() {
		const { theme = 'white' } = this.props
		if(!this.props.isSearching){
			return null
		}

		let you_will_get = 0, you_transfer = 0
		if(this.props.selectedTrades.length > 0){
			you_will_get = this.props.selectedTrades[0].have_amount
			if(this.props.selectedTrades[0].have_currency === 'IDR'){
				you_will_get = Math.round(you_will_get)
				you_will_get = accounting.formatMoney(you_will_get,'', 0, ',')
			}else{
				you_will_get = Math.round(you_will_get * 100) / 100
				you_will_get = accounting.formatMoney(you_will_get,'', 2, ',')
			}
			you_transfer = this.props.selectedTrades[0].need_amount
			if(this.props.selectedTrades[0].need_currency === 'IDR'){
				you_transfer = Math.round(you_transfer)
				you_transfer = accounting.formatMoney(you_transfer,'', 0, ',')
			}else{
				you_transfer = Math.round(you_transfer * 100) / 100
				you_transfer = accounting.formatMoney(you_transfer,'', 2, ',')
			}
		}
		return (
			<Row>
				<div className="col col-xs-12 col-md-12 background-secondary-light tb-col">
					{
						!this.props.loading && this.props.closestTrade && this.props.closestTrade.length > 0 ?
							<h2 className="font20 text-secondary font-weight-bold">{ strings.select_trader }</h2>
							: null
					}
					<Row>
						{
							this.props.loading ?
								<div className="d-flex justify-content-center full-width">
									<Loading />
								</div> 
								:
								this.props.closestTrade && this.props.closestTrade.length > 0 ?
									this.props.closestTrade.map((trade, tradeIndex) => {
										return(
											<TradeCard 
												key={ tradeIndex }
												data={ trade }
												onSelectTrade={ (trade) => this.props.onSelectTrade(trade) }
												disabled={ this.props.selectedTrades && this.props.selectedTrades.length > 0 }
											/>
										)
									})
									:
									<div className="font20 text-secondary font-weight-semi-bold text-center full-width">{ strings.no_post }</div>
						}
	
					</Row>
					{
						!this.props.loading && this.props.closestTrade && this.props.closestTrade.length > 0 ?
							<Pagination 
								detailPage={ this.props.detailPage }
								onStartTrading={ (page) => this.props.onStartTrading(page) }						
								disabled={ this.props.selectedTrades && this.props.selectedTrades.length > 0 }
							/>
							: null	
					}
					{
						this.props.selectedTrades && this.props.selectedTrades.length > 0 &&
					<div className="background-secondary-semi tb-selected-box">
						<h2 className="font20 text-white font-weight-bold">{ strings.will_trade_with }</h2>
						<Row>
							{
								this.props.selectedTrades && this.props.selectedTrades.map((trade, tradeIndex) => {
									return(
										<TradeCard 
											key={ tradeIndex }
											data={ trade }
											onRemoveTrade={ () => this.props.onRemoveTrade(tradeIndex) }
											remove
										/>
									)
								})
							}					
						</Row>
					</div>
					}
					{
						this.props.selectedTrades && this.props.selectedTrades.length > 0 &&
					<Row className="background-primary tb-traded-box">
						<div className="col col-md-4">
							<p className="font20 text-secondary-semi no-margin font-weight-bold">{ strings.will_get }</p>
							<p className="font24 text-white font-weight-bold">{ getSymbolFromCurrency(this.props.selectedTrades[0].have_currency) } { you_will_get }</p>
							{/* kotuka fee */}
							<p className="font14 text-secondary-semi no-margin font-weight-bold">{ strings.kotuka_fee }</p>
							<p className="font14 text-secondary font-weight-bold">{ strings.fee_percent }</p>
						</div>
						<div className="col col-md-5">
							<p className="font20 text-secondary-semi no-margin font-weight-bold">{ strings.you_have_to_transfer }</p>
							<p className="font24 text-white font-weight-bold">{ getSymbolFromCurrency(this.props.selectedTrades[0].need_currency) } { you_transfer }</p>
						</div>
						<div className="col col-md-3">
							<button className="button button-yellow full-width" onClick={ this.props.onTradeClick }>{strings.trade}</button>
						</div>
					</Row>
					}
				</div>
				<div className="col col-xs-12 col-md-12 text-center">
					{
						this.props.closestTrade && this.props.closestTrade.length > 0 &&
						<h2 className={ 'font20 font-weight-semi-bold '.concat(theme === 'secondary' ? 'text-primary' : 'text-white') }>{ strings.no_post_match }</h2>	
					}
					<button className="button button-primary" onClick={ this.props.createPost } >{ strings.create_post }</	button>			
				</div>
			</Row>
		)
	}
}

TradeBox.propTypes = {
	theme: PropTypes.string,
	closestTrade: PropTypes.any,
	selectedTrades: PropTypes.any,
	onSelectTrade: PropTypes.func,
	onRemoveTrade: PropTypes.func,
	createPost: PropTypes.func,
	isSearching: PropTypes.bool,
	loading: PropTypes.bool,
	detailPage: PropTypes.object,
	onStartTrading: PropTypes.func,
	onTradeClick: PropTypes.func,
}

export default TradeBox