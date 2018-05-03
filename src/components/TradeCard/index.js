import React, { Component } from 'react'
import PropTypes from 'prop-types'
import accounting from 'accounting'

import './style.scss'
import Row from '../Row'
import strings from '../../localizations'
import TradeLevel from '../TradeLevel'

class TradeCard extends Component {
	render() {
		const { disabled = false, withoutSelect = false, data = {}, remove = false } = this.props
		const user = data.User || {
			first_and_middle_name : '',
			last_name: '',
			response: 0
		}
		let amountNeed = data.need_amount
		if(data.need_currency === 'IDR'){
			amountNeed = Math.round(amountNeed)
			amountNeed = accounting.formatMoney(amountNeed,'', 0, ',')
		}else{
			amountNeed = Math.round(amountNeed * 100) / 100
			amountNeed = accounting.formatMoney(amountNeed,'', 2, ',')
		}
		let amountHave = data.have_amount
		if(data.have_currency === 'IDR'){
			amountHave = Math.round(amountHave)
			amountHave = accounting.formatMoney(amountHave,'', 0, ',')
		}else{
			amountHave = Math.round(amountHave * 100) / 100
			amountHave = accounting.formatMoney(amountHave,'', 2, ',')
		}
		return (
			<div className="col col-md-6">
				<Row className="tc-col position-relative">
					<div className="col col-md-auto tc-img-col d-flex align-items-center">
						<div className="tc-image" />
					</div>
					<div className="col no-padding">
						<p className="font14 text-gray-dark no-margin p_line">{ user.first_and_middle_name } { user.last_name }</p>
						{
							!withoutSelect &&
							<p className="font12 text-gray no-margin p_line">4 { strings.hours_ago }</p>
						}
						<p className="font16 text-secondary no-margin p_line font-weight-semi-bold">{ strings.need } <span className="text-black">{ amountNeed }</span></p>
						<p className="font16 text-primary no-margin p_line font-weight-semi-bold">{ strings.can_give } <span className="text-black">{ amountHave }</span></p>
					</div>
					{
						!withoutSelect &&
						<div className="col col-md-auto d-flex flex-column justify-content-between">
							<div>
								<TradeLevel 
									level={ user.response }
								/>
								<span className="font12 text-gray">1Rp = £ 0.00005184</span>
							</div>
							{
								remove ? 
								<button className="button-xs button-primary align-self-end" onClick={ this.props.onRemoveTrade }>{ strings.remove }</button>
								:
								<button className="button-xs button-secondary align-self-end" onClick={ () => this.props.onSelectTrade(data) }>{ strings.select }</button>
							}
						</div>
					}
					{
						disabled &&
						<div className="tc-disabled" />
					}
				</Row>
			</div>	
		)
	}
}

TradeCard.propTypes = {
	disabled: PropTypes.bool,
	withoutSelect: PropTypes.bool,
	data: PropTypes.object,
	remove: PropTypes.bool,
	onRemoveTrade: PropTypes.func
}

export default TradeCard