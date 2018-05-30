import React, { Component } from 'react'
import Modal from '../../components/Modal'
import PropTypes from 'prop-types'

import * as selectors from './selectors'
import * as actions from './actions'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './style.scss'

class Prompt extends Component {
	componentWillMount() {
		this.props.setPrompt(false)
	}
	render() {
		return (
			<Modal open={ this.props.open } onClose={ () => this.props.setPrompt(false) } contentStyle="mic-wrapper" >
				<div className="mic-content">			
					<h2 className="font24 text-secondary font-weight-bold">Hello, </h2>
					<div className="font16 text-black-semi font-weight-semi-bold">
						You need to login, to make a trade.
					</div>
					<div className="text-right">
						<button className="button-sm button-primary" onClick={ () => this.props.setPrompt(false) }>OK</button>
					</div>
				</div>
			</Modal>
		)
	}
}

Prompt.propTypes = {
	open: PropTypes.bool,
	setPrompt: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
	open: selectors.getPrompt()
})

const mapDispatchToProps = (dispatch) => ({
	setPrompt : (prompt) => dispatch(actions.setPrompt(prompt))
})

export default connect(mapStateToProps, mapDispatchToProps)(Prompt)