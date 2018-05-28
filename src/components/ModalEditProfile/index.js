import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import LabelInput from './../LabelInput'


import './style.scss'
import strings from '../../localizations'
import Row from '../Row'
import { chunkArray } from '../../services/helper'
import Select from 'react-select-plus/lib/Select'
import TitleWithHr from '../TitleWithHr'


class ModalEditProfile extends Component {
	renderItem = (props) => {
		return(
			<div className="Select-value">
				<img className="select-logo" src={ props.image } />
				<span className="Select-value-label">{ props.value }</span>
			</div>
		)
	}
	render() {
		const options = chunkArray(this.props.countries, 'name', 'name', 'flag')		
		const optionsNum = chunkArray(this.props.countries, 'callingCodes', 'callingCodes', 'flag', true)
		return (
			<Modal open={ this.props.open } onClose={ this.props.onClose } contentStyle="mep-wrapper" >
				<div className="mic-content">			
					<h2 className="font24 text-center text-black-semi font-weight-bold">
						{ strings.edit_profile }
					</h2>
					<hr />
					<div className="mep-photo-profile mx-auto clickable" />
					<Row>
						<div className="col col-md-6">
							<LabelInput disabled name="firstname" label={ strings.first_n_midle_name } />
							<LabelInput disabled name="birthdate" label={ strings.birthdate } />
						</div>
						<div className="col col-md-6">
							<LabelInput disabled name="lastaname" label={ strings.last_name } />
							<label className="font16 text-black-semi full-width no-margin font-weight-semi-bold">{ strings.phone }</label>						
							<Row>
								<div className="col col-md-auto no-right-padding">
									<Select
										className="li-input-select mep-num"
										name="form-field-name"
										value={ '+62' }
										clearable={ false }
										// onChange={ 'Indonesia' }
										autosize={ false }
										options={ optionsNum }
										valueRenderer={ (props) => this.renderItem(props) }
									/>
								</div>
								<div className="col">
									<LabelInput name="phone" noLabel />
								</div>
							</Row>
						</div>
						<div className="col col-md-12">
							<TitleWithHr
								className="font24"
								title={ strings.address }
							/>
						</div>
						<div className="col col-md-6">
							<label className="font16 text-black-semi full-width no-margin font-weight-semi-bold">{ strings.country }</label>						
							<Select
								className="li-input-select"
								name="form-field-name"
								value={ 'Indonesia' }
								clearable={ false }
								// onChange={ 'Indonesia' }
								autosize={ false }
								options={ options }
								valueRenderer={ (props) => this.renderItem(props) }
							/>
							<LabelInput name="postalCode" label={ strings.postalCode } />							
						</div>
						<div className="col col-md-6">
							<LabelInput type="textarea" name="postalCode" label={ strings.address } />
						</div>
						<div className="col col-md-12 d-flex justify-content-end">
							<button className="button button-secondary-white">{ strings.cancel }</button>
							<button className="button button-primary mep-btn">{ strings.save }</button>
						</div>				
					</Row>						
				</div>
			</Modal>
		)
	}
}

ModalEditProfile.propTypes = {
	open: PropTypes.bool,
	loading: PropTypes.bool,
	onClose: PropTypes.func,
	onButtonClick: PropTypes.func,
	countries: PropTypes.any
}

export default ModalEditProfile