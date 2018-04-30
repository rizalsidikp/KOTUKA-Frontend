import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss'
import Row from '../Row'
import strings from '../../localizations'
import ModalHelp from '../ModalHelp'

class CopyRight extends Component {
	constructor(props) {
		super(props)
		this.state = {
			modalHelp: false
		}
	}
	
	render() {
		const { theme = 'blue-dark' } = this.props
		return (
			<div className={ 'container-fluid '.concat(theme === 'blue-dark' ? 'background-blue-dark' : '') }>
				<div className="container">
					<Row className={ 'align-items-center cp-row '.concat(theme === 'light' ? 'cp-row-light' : '') }>
						<div className={ 'col text-left font14 font-weight-semi-bold '.concat(theme === 'light' ? 'text-blue' : 'text-white') }>
							{ strings.cp_right }
						</div>
						<div className="col text-right">
							<button className="button button-rounded button-blue font20 text-white font-weight-semi-bold" onClick={ () => this.setState({ modalHelp: true }) }>{ strings.need_help }</button>
						</div>
					</Row>
				</div>
				<ModalHelp
					open={ this.state.modalHelp }
					onClose={ () => this.setState({ modalHelp: false }) }
				/>
			</div>
		)
	}
}

CopyRight.propTypes = {
	theme: PropTypes.string
}

export default CopyRight