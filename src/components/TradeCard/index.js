import React, { Component } from 'react'
import PropTypes from 'prop-types'
import accounting from 'accounting'
import moment from 'moment'
import getSymbolFromCurrency from 'currency-symbol-map'

import './style.scss'
import Row from '../Row'
import strings from '../../localizations'
import TradeLevel from '../TradeLevel'

import { censoredText } from './../../services/helper'


class TradeCard extends Component {
	render() {
		const { disabled = false, withoutSelect = false, data = {}, remove = false, anonymous = false } = this.props
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
						<div className="tc-image" style={{ backgroundImage: `url('${ anonymous ? Profile : user.avatar }')` }} />
					</div>
					<div className="col no-padding">
						<p className="font14 text-gray-dark no-margin p_line"> { anonymous ? censoredText(user.first_and_middle_name + ' ' + user.last_name) : user.first_and_middle_name + ' ' + user.last_name }</p>
						{
							!withoutSelect &&
							<p className="font12 text-gray no-margin p_line">{ moment(data.createdAt).fromNow() }</p>
						}
						<p className="font16 text-primary no-margin p_line font-weight-semi-bold">{ strings.can_give } <span className="text-black">{ getSymbolFromCurrency(data.have_currency) } { amountHave }</span></p>
						<p className="font16 text-secondary no-margin p_line font-weight-semi-bold">{ strings.need } <span className="text-black">{ getSymbolFromCurrency(data.need_currency) } { amountNeed }</span></p>
					</div>
					{
						!withoutSelect &&
						<div className="col col-md-auto d-flex flex-column justify-content-between">
							<div>
								<TradeLevel 
									level={ user.response }
								/>
								<span className="font12 text-gray">1{getSymbolFromCurrency(data.have_currency)} = { getSymbolFromCurrency(data.need_currency) } {accounting.formatMoney(data.currency_rate, '', data.have_currency === 'IDR' ? 7 : 2)}</span>
							</div>
							{
								remove ? 
									<button className="button-xs button-primary align-self-end" onClick={ this.props.onRemoveTrade }>{ strings.remove }</button>
									:
									this.props.data && this.props.data.status_poster === 'PICKED' ?
										'On Transaction'
										:
										this.props.data && this.props.id_user !== this.props.data.id_user &&
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
	anonymous: PropTypes.bool,
	onRemoveTrade: PropTypes.func,
	onSelectTrade: PropTypes.func,
	id_user: PropTypes.number,
}

export default TradeCard