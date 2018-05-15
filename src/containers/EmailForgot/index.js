import React, { Component } from 'react'
import Row from '../../components/Row'
// import PropTypes from 'prop-types'


import { Logo } from './../../images'
import strings from '../../localizations'
import CopyRight from '../../components/CopyRight'

class Confirmation extends Component {
	render() {
		return (
			<div>
				<div className="container confirm-container">
					<Row>
						<div className="col col-md-12 text-center">
							<img src={ Logo } className='confirm-logo' />
						</div>
						<div className="col col-md-12 text-center">
							<div className="confirm-img confirm-img-show" />
						</div>
						<div className="col col-md-5 mx-auto text-center">
							<h1 className="font24 text-secondary font-weight-semi-bold">{ strings.we_sent_email_retrieve }</h1>
							<p className="font20 text-gray-80">{strings.check_your_email}</p>
							<label className="font16 text-primary font-weight-semi-bold clickable">{ strings.didnt_get_email }</label>
						</div>
					</Row>
				</div>
				<CopyRight />
			</div>
		)
	}
}

// Confirmation.propTypes = {
// 	location: PropTypes.object
// }

export default Confirmation