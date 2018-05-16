import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'


import './style.scss'
import strings from '../../localizations'


class ModalIdCard extends Component {
	render() {
		return (
			<Modal open={ this.props.open } onClose={ this.props.onClose } contentStyle="mic-wrapper" >
				<div className="mic-content">			
					<h2 className="font24 text-center text-black-semi font-weight-bold">
						{ strings.identify_verification }
					</h2>
					<hr />
					<div className="font14">{ strings.for_security_reason }</div>
					<div className="mic-image-upload clickable" style={{ backgroundImage: `url('${ this.props.imagePreviewUrl }')` }} onClick={ this.props.onButtonClick }>
						{
							this.props.imagePreviewUrl === '' &&
							<div className="d-flex full-height align-items-center justify-content-center">
								<label className="font16 font-weight-bold text-gray">{ strings.upload_id_card }</label>
							</div>
						}
					</div>
					<button disabled={ this.props.imagePreviewUrl === '' } className="button button-primary full-width">{ strings.verify_my_identity }</button>
				</div>
			</Modal>
		)
	}
}

ModalIdCard.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	onButtonClick: PropTypes.func,
	recipients: PropTypes.array,
	imagePreviewUrl: PropTypes.string
}

export default ModalIdCard