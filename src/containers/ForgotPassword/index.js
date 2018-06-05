import React, { Component } from 'react'
import Row from '../../components/Row'
// import PropTypes from 'prop-types'


import { Logo } from './../../images'
import strings from '../../localizations'
import LabelInput from '../../components/LabelInput'
import CopyRight from '../CopyRight'

class Confirmation extends Component {

	constructor(props) {
		super(props)
		this.state={
			email: ''
		}
	}

	render() {
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
							<h1 className="font24 text-secondary font-weight-semi-bold">{ strings.you_forgot }</h1>
							<p className="font20 text-gray-80">{strings.its_oke}</p>
							<Row>
								<div className="col col-md-8 mx-auto">
									<LabelInput name="email" noLabel placeholder={ strings.user_example } value={ this.state.email } onChange={ (e) => this.setState({ email: e.target.value }) } />
									<button className="button button-primary" > { strings.retrieve_password } </button>
								</div>
							</Row>
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