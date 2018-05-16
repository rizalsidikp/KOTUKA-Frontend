import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

class TitleWithHr extends Component {
	render() {
		return (
			<h2 className="font14 font-weight-bold text-black-semi twh-h2">{ this.props.title }</h2>
		)
	}
}

TitleWithHr.propTypes = {
	title: PropTypes.string
}

export default TitleWithHr