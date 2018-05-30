import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as selectors from './selectors'
import * as actions from './actions'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './style.scss'
import { AlertSuccess, AlertDanger, Close } from '../../images'

class Alert extends Component {

	componentWillMount(){
		this.props.setAlert(this.props.open, this.props.theme, this.props.message)
	}

	onClose = () => {
		this.props.setAlert(false, this.props.theme, this.props.message)
	}

	render() {
		return (
			<div className={ 'alert-wrapper '.concat(this.props.open ? 'alert-wrapper-open ' : '', this.props.theme === 'danger' ? 'alert-red' : 'alert-green')  } onClick={ this.onClose }>
				<div>
					<img src={ this.props.theme === 'danger' ? AlertDanger : AlertSuccess } className="alert-image" />
				</div>
				<div className="alert-text full-width">
					{ this.props.message }
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
	theme: PropTypes.string,
	message: PropTypes.string,
}

const mapStateToProps = createStructuredSelector({
	open: selectors.getAlert(),
	theme: selectors.getTheme(),
	message: selectors.getMessage()
})

const mapDispatchToProps = (dispatch) => ({
	setAlert : (alert, theme, message) => dispatch(actions.setAlertStatus(alert, theme, message))
})

export default connect(mapStateToProps, mapDispatchToProps)(Alert)