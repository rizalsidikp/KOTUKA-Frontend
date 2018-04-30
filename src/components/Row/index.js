import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Row extends Component {
	render() {
		return (
			<div className={ 'row '.concat(this.props.className) }>
				{ this.props.children }
			</div>
		)
	}
}

Row.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string
}

export default Row