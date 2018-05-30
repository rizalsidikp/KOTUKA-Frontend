import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

class Bank extends Component {
	render() {
		const { onClick = () => {}, selected = false, img = '' } = this.props
		return (
			<div className={ 'col col-md-3 b-ccc' } onClick={ onClick } >
				<div className={ 'b-col d-flex align-items-center justify-content-center '.concat(selected ? 'b-col-selected' : 'clickable ') }>
					<img src={ img } />
				</div>
			</div>	
		)
	}
}

Bank.propTypes = {
	onClick : PropTypes.func,
	selected : PropTypes.bool,
	img: PropTypes.string
}

export default Bank