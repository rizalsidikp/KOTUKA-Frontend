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
		this.props.setPrompt(false, '', '')
	}
	render() {
		return (
			<Modal open={ this.props.open } onClose={ () => this.props.setPrompt(false, this.props.header, this.props.text) } contentStyle="mic-wrapper" >
				<div className="mic-content">
					<h2 className="font24 text-secondary font-weight-bold">{this.props.header}, </h2>
					<div className="font16 text-black-semi font-weight-semi-bold">
						{ this.props.text }
					</div>
					<div className="text-right">
						<button className="button-sm button-primary" onClick={ () => this.props.setPrompt(false, this.props.header, this.props.text) }>OK</button>
					</div>
				</div>
			</Modal>
		)
	}
}

Prompt.propTypes = {
	open: PropTypes.bool,
	setPrompt: PropTypes.func,
	header: PropTypes.string,
	text: PropTypes.string
}

const mapStateToProps = createStructuredSelector({
	open: selectors.getPrompt(),
	header: selectors.getHeader(),
	text: selectors.getText()
})

const mapDispatchToProps = (dispatch) => ({
	setPrompt : (prompt, header, text) => dispatch(actions.setPrompt(prompt, header, text))
})

export default connect(mapStateToProps, mapDispatchToProps)(Prompt)