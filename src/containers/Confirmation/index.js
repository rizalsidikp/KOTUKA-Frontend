import React, { Component } from 'react'
import Row from '../../components/Row'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import './style.scss'

import { Logo } from './../../images'
import strings from '../../localizations'
import CopyRight from '../../components/CopyRight'

class Confirmation extends Component {
	render() {
		if(!this.props.location.state){
			return <Redirect to="/" />
		}
		return (
			<div>
				<div className="container confirm-container">
					<Row>
						<div className="col col-md-12 text-center">
							<img src={ Logo } className='confirm-logo' />
						</div>
						<div className="col col-md-12 text-center">
							<div className="confirm-img" />
						</div>
						<div className="col col-md-5 mx-auto text-center">
							<h1 className="font24 text-secondary font-weight-semi-bold">{ strings.sent_confirm }</h1>
							<p className="font20 text-gray-80">{strings.to_log_in} <span className="text-secondary clickable">({this.props.location.state.email}). <br /> </span>{ strings.we_sent }</p>
						</div>
					</Row>
				</div>
				<CopyRight />
			</div>
		)
	}
}

Confirmation.propTypes = {
	location: PropTypes.object
}

export default Confirmation