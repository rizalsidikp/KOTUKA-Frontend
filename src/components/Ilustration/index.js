import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Row from './../Row'

import './style.scss'

class Ilustration extends Component {
	render() {
		
		const { reverse = false, title = '', subtitle = '' } = this.props
		
		return (
			<Row className={ 'justify-content-center il-row '.concat(reverse ? 'flex-row-reverse' : '') }>
				<div className="col col-md-4">
					<h3 className="font20 text-primary font-weight-semi-bold">{title}</h3>
					<span className="font16 text-gray">{subtitle}</span>
				</div>
				<div className="col col-md-4">
					<div className="ilust-card d-flex align-items-center justify-content-center">
						ILUSTRASI
					</div>
				</div>
			</Row>
		)
	}
}

Ilustration.propTypes = {
	reverse: PropTypes.bool,
	title: PropTypes.string,
	subtitle: PropTypes.string
}

export default Ilustration