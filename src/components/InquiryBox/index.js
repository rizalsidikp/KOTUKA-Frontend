import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import strings from '../../localizations'

class InquiryBox extends Component {
	render() {
		const { you = false, status = '', name = '' } = this.props
		return (
			<div className="ib-box">
				{
					status === 'completed' ?
						<div className="d-flex background-green-light">
							<div className="font14 font-weight-semi-bold ib-completed">{ name }</div>
							<div className="background-green ib-check-circle">
								<div className="ib-checklist" />
							</div>
						</div>
						:
						<div className="d-flex">
							<div className="font14 font-weight-semi-bold text-black ib-name background-light">
								{ you ? strings.you : name } &nbsp;
								<span className="text-orange">11h 59m 59s</span>
							</div>
							{
								you ?
									<div className="font14 text-white font-weight-semi-bold button-secondary ib-pay clickable">{ strings.pay_now }</div>
									: null
							}
						</div>
				}
			</div>
		)
	}
}

InquiryBox.propTypes = {
	you: PropTypes.bool,
	status: PropTypes.string,
	name: PropTypes.string
}

export default InquiryBox