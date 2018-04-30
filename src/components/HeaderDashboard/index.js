import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

import Row from '../Row'

import strings from '../../localizations'
import history from './../../history'
import { Logo } from './../../images'

class HeaderDashboard extends Component {

	linkTo = (link) => {
		if(this.props.location.pathname !== link){
			return history.push(link)
		}
	}

	render() {
		return (
			<div className="container">
				<div className="background-blue hd-top-border" />
				<Row className="align-items-center hd-row">
					<div className="col col-md-auto">
						<img src={ Logo } />
					</div>
					<div className="col d-flex align-items-center">
						<div className={ 'hd-button '.concat(this.props.activePage === 'post' ? 'hd-button-active' : '') } onClick={ () => this.linkTo('/dashboard/post') }>
							{ strings.post }
						</div>
						<div className={ 'hd-button '.concat(this.props.activePage === 'transaction' ? 'hd-button-active' : '') } onClick={ () => this.linkTo('/dashboard/transaction') }>
							{strings.transaction}
						</div>
						<div className={ 'hd-button '.concat(this.props.activePage === 'recipient' ? 'hd-button-active' : '') } onClick={ () => this.linkTo('/dashboard/recipient') }>
							{strings.recipient}
						</div>
					</div>
					<div className="col col-md-auto d-flex align-items-center clickable">
						<div className='hd-image' /><i className='down hd-arrow' />
					</div>
				</Row>
			</div>
		)
	}
}

HeaderDashboard.propTypes = {
	activePage : PropTypes.string,
	location: PropTypes.object
}

export default HeaderDashboard