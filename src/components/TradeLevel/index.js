import React, { Component } from 'react'
import Row from '../Row'

import './style.scss'
import strings from '../../localizations'

class TradeLevel extends Component {
	render() {
		return (
			<Row className={ 'no-margin justify-content-end font12 tl-p '.concat('text-secondary') }>
				<div className="tl-text">Fast {strings.trader}</div>
				<div className={ 'tl-block '.concat('background-secondary') } />
				<div className={ 'tl-block '.concat('background-secondary') } />
				<div className={ 'tl-block '.concat('background-secondary') } />
			</Row>
		)
	}
}

export default TradeLevel