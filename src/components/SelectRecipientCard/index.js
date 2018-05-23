import React, { Component } from 'react'
import PropTypes from 'prop-types'
import strings from './../../localizations'

import Row from './../Row'
import './style.scss'

class SelectRecipientCard extends Component {
	render() {
		const { data = {}, onClick = () => {} } = this.props
		return (
			<Row className="src-row no-margin align-items-center">
				<div className="col col-md-9">
					<div className="font16 font-weight-bold text-primary">{ strings.bank_account }</div>
					<div className="font14 text-black-semi">{ data.first_and_middle_name + ' ' + data.last_name }</div>
					<div className="font14 text-black-semi">{ data.account_no }</div>
				</div>
				<div className="col col-md-3 text-right">
					<button className="button-sm button-primary full-width" onClick={ onClick } >{ strings.select }</button>
				</div>
			</Row>
		)
	}
}

SelectRecipientCard.propTypes = {
	data: PropTypes.object,
	onClick: PropTypes.func
}

export default SelectRecipientCard