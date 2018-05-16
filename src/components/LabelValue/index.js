import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LabelValue extends Component {
	render() {
		const { labelClassName = '', valueClassName = '' } = this.props
		return (
			<div className="tc-td">
				<div className={ 'font12 font-weight-semi-bold '.concat(labelClassName) }>{ this.props.label }</div>
				<div className={ 'font16 text-primary '.concat(valueClassName) }>{ this.props.value }</div>
			</div>
		)
	}
}

LabelValue.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	labelClassName: PropTypes.string,
	valueClassName: PropTypes.string,
}

export default LabelValue