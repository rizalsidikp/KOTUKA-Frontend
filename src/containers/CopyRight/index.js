import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './../Header/selectors'
import * as actions from './../Header/actions'
import PropTypes from 'prop-types'

import './style.scss'
import strings from '../../localizations'
import ModalHelp from '../../components/ModalHelp'
import Row from '../../components/Row'

class CopyRight extends Component {
	constructor(props) {
		super(props)
		this.state = {
			modalHelp: false
		}
	}

	sendEmail = async(payload) => {
		await this.props.sendEmail(payload)
		this.setState({ modalHelp: false })
	}
	
	render() {
		const { theme = 'primary' } = this.props
		return (
			<div className={ 'container-fluid '.concat(theme === 'primary' ? 'background-primary' : '') }>
				<div className="container">
					<Row className={ 'align-items-center cp-row '.concat(theme === 'light' ? 'cp-row-light' : '') }>
						<div className={ 'col text-left font14 font-weight-semi-bold '.concat(theme === 'light' ? 'text-secondary' : 'text-white') }>
							{ strings.cp_right }
						</div>
						<div className="col text-right">
							<button className="button button-secondary" onClick={ () => this.setState({ modalHelp: true }) }>{ strings.need_help }</button>
						</div>
					</Row>
				</div>
				<ModalHelp
					open={ this.state.modalHelp }
					onClose={ () => this.setState({ modalHelp: false }) }
					loading={ this.props.loading }
					onClick={ (payload) => this.sendEmail(payload) }
				/>
			</div>
		)
	}
}

CopyRight.propTypes = {
	theme: PropTypes.string,
	loading: PropTypes.bool,
	sendEmail: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.getLoading(),
})

const mapDispatchToProps = (dispatch) => ({
	sendEmail: (payload) => dispatch(actions.sendEmail(payload)),
})

export default connect (mapStateToProps, mapDispatchToProps) (CopyRight)