import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

class Modal extends Component {


	onClose = (event) => {
		event.preventDefault()
		if(event.currentTarget === event.target){
			this.props.onClose()
		}
	}

	// componentWillUpdate() {
	// 	if(this.props.open){
	// 		document.body.style.overflowY = 'hidden'
	// 	}else{
	// 		document.body.style.overflowY = 'auto'
	// 	}
	// }

	render() {
		return (
			<div>
				<div className={ 'modal-wrapper '.concat(this.props.open ? 'modal-wrapper-open' : '') } onClick={ this.onClose }>
					<div className='modal-content-wrapper'>
						<div className={ 'modal-content '.concat(this.props.open ? 'modal-content-open ' : '', this.props.contentStyle) }>
							{ this.props.children }
						</div>
					</div>
				</div>
			</div>	
		)
	}
}

Modal.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	children: PropTypes.node,
	contentStyle: PropTypes.string
}

export default Modal