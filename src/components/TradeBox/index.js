import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from '../Row'
import './style.scss'
import strings from '../../localizations'
import TradeCard from '../TradeCard'
import Pagination from '../Pagination'

class TradeBox extends Component {
	render() {
		const { theme = 'white' } = this.props
		if(!this.props.closestTrade || this.props.closestTrade.length < 1){
			return null
		}
		return (
			<Row>
				<div className="col col-xs-12 col-md-12 background-secondary-light tb-col">
					<h2 className="font20 text-secondary font-weight-bold">{ strings.select_trader }</h2>
					<Row>
						{
							this.props.closestTrade && this.props.closestTrade.map((trade, tradeIndex) => {
								return(
									<TradeCard 
										key={ tradeIndex }
										data={ trade }
										onSelectTrade={ (trade) => this.props.onSelectTrade(trade) }
										disabled={ this.props.selectedTrades && this.props.selectedTrades.length > 0 }
									/>
								)
							})
						}
					</Row>
					<Pagination />
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
							<p className="font24 text-white font-weight-bold">£ 1,038.23</p>
							{/* kotuka fee */}
							<p className="font14 text-secondary-semi no-margin font-weight-bold">{ strings.kotuka_fee }</p>
							<p className="font14 text-secondary font-weight-bold">{ strings.fee_percent }</p>
						</div>
						<div className="col col-md-5">
							<p className="font20 text-secondary-semi no-margin font-weight-bold">{ strings.you_have_to_transfer }</p>
							<p className="font24 text-white font-weight-bold">Rp 20,000,000</p>
						</div>
						<div className="col col-md-3">
							<button className="button button-yellow full-width">{strings.trade}</button>
						</div>
					</Row>
					}
				</div>
				<div className="col col-xs-12 col-md-12 text-center">
					<h2 className={ 'font20 font-weight-semi-bold '.concat(theme === 'secondary' ? 'text-primary' : 'text-white') }>{ strings.no_post_match }</h2>	
					<button className="button button-primary" onClick={ () => {} } >{ strings.create_post }</	button>			
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
}

export default TradeBox