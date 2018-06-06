import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'


import './style.scss'
import strings from '../../localizations'
import { Upload } from './../../images'


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
							this.props.imagePreviewUrl === '' || this.props.wrongImage ?
								<div className="d-flex full-height align-items-center justify-content-center">
									<div className="text-center">
										<img src={ Upload } />
										<label className="font16 font-weight-bold text-gray full-width">{ strings.upload_id_card }</label>
									</div>
								</div>
								: null
						}
					</div>
					{
						!!this.props.imagePreviewUrl && !this.props.wrongImage &&
						<label className="font14 full-width text-center font-weight-semi-bold">{ strings.click_image_to_change }</label>					
					}
					{
						this.props.wrongImage &&
						<label className="font14 text-red font-weight-semi-bold">{ strings.file_not_image }</label>					
					}
					{
						this.props.wrongSize &&
						<label className="font14 text-red font-weight-semi-bold">{ strings.file_to_large } 5MB</label>					
					}
					<button disabled={ this.props.imagePreviewUrl === '' || this.props.loading || this.props.wrongImage || this.props.wrongSize } className="button button-primary full-width" onClick={ this.props.onSendImage }>{ strings.verify_my_identity }</button>
				</div>
			</Modal>
		)
	}
}

ModalIdCard.propTypes = {
	open: PropTypes.bool,
	loading: PropTypes.bool,
	wrongImage: PropTypes.bool,
	wrongSize: PropTypes.bool,
	onClose: PropTypes.func,
	onButtonClick: PropTypes.func,
	onSendImage: PropTypes.func,
	recipients: PropTypes.array,
	imagePreviewUrl: PropTypes.string
}

export default ModalIdCard