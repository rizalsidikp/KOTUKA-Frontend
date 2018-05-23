import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

class RecipientSelect extends Component {
	render() {
		const { title = '', onClick = () => {}, active = false } = this.props
		return (
			<div className={ 'col ' }>
				<div className={ 'text-center font14 font-weight-bold rs-card '.concat(active ? 'rs-card-active' : 'clickable') } onClick={ onClick }>
					<div>
						<div className="rs-circle" />
						{ title }
					</div>
				</div>
			</div>
		)
	}
}

RecipientSelect.propTypes = {
	title: PropTypes.string,
	onClick: PropTypes.func,
	active: PropTypes.bool
}

export default RecipientSelect