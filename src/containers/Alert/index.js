import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as selectors from './selectors'
import * as actions from './actions'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './style.scss'
import { AlertSuccess, Close } from '../../images'

class Alert extends Component {

	componentWillMount(){
		this.props.setAlert(this.props.open)
	}

	onClose = () => {
		this.props.setAlert(false)
	}

	render() {
		return (
			<div className={ 'alert-wrapper '.concat(this.props.open ? 'alert-wrapper-open ' : '', 'alert-green')  } onClick={ this.onClose }>
				<div>
					<img src={ AlertSuccess } className="alert-image" />
				</div>
				<div className="alert-text full-width">
					Success! Thank you for completing your profile.
				</div>
				<div>
					<img src={ Close } className="alert-close" onClick={ this.onClose } />
				</div>
			</div>
		)
	}
}

Alert.propTypes = {
	open: PropTypes.bool,
	setAlert: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
	open: selectors.getAlert()
})

const mapDispatchToProps = (dispatch) => ({
	setAlert : (alert) => dispatch(actions.setAlertStatus(alert))
})

export default connect(mapStateToProps, mapDispatchToProps)(Alert)