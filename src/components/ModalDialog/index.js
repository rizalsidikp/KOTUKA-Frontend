import React, { Component } from 'react'
import Modal from '../../components/Modal'
import PropTypes from 'prop-types'


import strings from '../../localizations'

import './style.scss'

class ModalDialog extends Component {
	render() {
		return (
			<Modal open={ this.props.open } onClose={ this.props.onClose } contentStyle="mic-wrapper" >
				<div className="mic-content">
					<h2 className="font24 text-secondary font-weight-bold">{this.props.header}, </h2>
					<div className="font16 text-black-semi font-weight-semi-bold">
						{ this.props.text }
					</div>
					<div className="text-right md-btn-row">
						<button disabled={ this.props.loading } className="button-sm md-btn button-secondary-white" onClick={ this.props.onNoClick }>{ strings.no }</button> &emsp;
						<button disabled={ this.props.loading } className="button-sm md-btn button-danger" onClick={ this.props.onYesClick }>{ strings.yes }</button>
					</div>
				</div>
			</Modal>
		)
	}
}

ModalDialog.propTypes = {
	open: PropTypes.bool,
	loading: PropTypes.bool,
	header: PropTypes.string,
	text: PropTypes.string,
	onNoClick: PropTypes.func,
	onYesClick: PropTypes.func,
	onClose: PropTypes.func,
}

export default ModalDialog