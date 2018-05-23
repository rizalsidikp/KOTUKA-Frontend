import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import LabelInput from './../LabelInput'


// import './style.scss'
import strings from '../../localizations'


class ModalChangePassword extends Component {
	render() {
		return (
			<Modal open={ this.props.open } onClose={ this.props.onClose } >
				<div className="mic-content">			
					<h2 className="font24 text-center text-black-semi font-weight-bold">
						{ strings.change_password }
					</h2>
					<hr />
					<LabelInput
						type="password"
						name="oldPassword"
						label={ strings.your_old_password }
						placeholder={ strings.your_old_password }
					/>
					<LabelInput
						type="password"
						name="newPassword"
						label={ strings.your_new_password }
						placeholder={ strings.your_new_password }
					/>
					<LabelInput
						type="password"
						name="cPassword"
						label={ strings.confirm_new_password }
						placeholder={ strings.confirm_new_password }
					/>
					<button className="button button-primary full-width">{ strings.change }</button>
				</div>
			</Modal>
		)
	}
}

ModalChangePassword.propTypes = {
	open: PropTypes.bool,
	loading: PropTypes.bool,
	onClose: PropTypes.func,
	onButtonClick: PropTypes.func,
}

export default ModalChangePassword