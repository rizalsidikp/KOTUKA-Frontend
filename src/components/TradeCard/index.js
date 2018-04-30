import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss'
import Row from '../Row'
import strings from '../../localizations'
import TradeLevel from '../TradeLevel'

class TradeCard extends Component {
	render() {
		const { disabled = false, withoutSelect = false } = this.props
		return (
			<div className="col col-md-6">
				<Row className="tc-col position-relative">
					<div className="col col-md-auto tc-img-col d-flex align-items-center">
						<div className="tc-image" />
					</div>
					<div className="col no-padding">
						<p className="font14 text-gray-dark no-margin p_line">Sherina Munaf</p>
						{
							!withoutSelect &&
							<p className="font12 text-gray no-margin p_line">4 { strings.hours_ago }</p>
						}
						<p className="font16 text-blue no-margin p_line font-weight-semi-bold">{ strings.need } <span className="text-black">Rp 20,000,000</span></p>
						<p className="font16 text-blue-dark no-margin p_line font-weight-semi-bold">{ strings.can_give } <span className="text-black">£ 1,036.40</span></p>
					</div>
					{
						!withoutSelect &&
						<div className="col col-md-auto d-flex flex-column justify-content-between">
							<div>
								<TradeLevel />
								<span className="font12 text-gray">1Rp = £ 0.00005184</span>
							</div>
							<button className="button-sm button-blue button-rounded text-white font-weight-bold align-self-end">{ strings.select }</button>
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
}

export default TradeCard