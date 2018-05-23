import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

class TitleWithHr extends Component {
	render() {
		return (
			<h2 className={ 'font18 font-weight-bold text-black-semi twh-h2 '.concat(this.props.className) }>{ this.props.title }</h2>
		)
	}
}

TitleWithHr.propTypes = {
	title: PropTypes.string,
	className: PropTypes.string,
}

export default TitleWithHr