import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from '../Row'

import './style.scss'
import strings from '../../localizations'

class TradeLevel extends Component {
	render() {
		const level = this.props.level <= 0 ? 0 : this.props.level <= 3 ? 1 : this.props.level <= 6 ? 2 : 3
		return (
			<Row className={ 'no-margin justify-content-end font12 tl-p '.concat(level === 1 ? 'text-primary-dark' : level === 2 ? 'text-primary' : level === 3 ? 'text-secondary' : 'text-gray-80') }>
				<div className="tl-text font-weight-bold">{
					level === 1 ? strings.tolerable : level === 2 ? strings.fair : level === 3 ? strings.fast : ''
				} { level !== 0 && strings.trader}</div>
				<div className={ 'tl-block '.concat(level === 1 ? 'background-primary-dark' : level === 2 ? 'background-primary' : level === 3 ? 'background-secondary' : 'background-gray-80') } />
				<div className={ 'tl-block '.concat(level === 2 ? 'background-primary' : level === 3 ? 'background-secondary' : 'background-gray-80') } />
				<div className={ 'tl-block '.concat(level === 3 ? 'background-secondary' : 'background-gray-80') } />
			</Row>
		)
	}
}

TradeLevel.propTypes = {
	level: PropTypes.number
}

export default TradeLevel