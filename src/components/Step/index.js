import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from './../Row'
import { Collapse } from 'react-collapse'
import './style.scss'
import strings from '../../localizations'


class Step extends Component {
	render() {
		const { active = false, theme = 'center', pass = false, disabledNext = false } = this.props
		return (
			<Row>
				<div className={ 'col col-md-auto '.concat(theme === 'top' ? 'trade-c-line-top' : theme === 'bottom' ? 'trade-c-line-bottom' : 'trade-c-line', pass ? ' trade-c-line-pass' : '') }>
					<div className={ active || pass ? 'trade-c-circle-active' : 'trade-c-circle' } />
				</div>
				<div className={ 'col trade-c-box ' }>
					<Collapse isOpened={ true }>
						{
							!pass &&							
							<div className={ 'font14 '.concat(active ? 'text-secondary font-weight-bold' : 'text-black-semi') }>{ this.props.title }</div>
						}
						{
							active && !pass &&
							<Row className="align-items-center no-margin">
								<div className={ 'col col-md-10 '.concat(active ? 'background-secondary-light trade-c-child' : '') }>
									{ this.props.children }
								</div>
								<div className={ 'col col-md-2' }>
									{
										theme !== 'bottom' &&
										<button disabled={ disabledNext } className="button-sm button-primary" onClick={  this.props.onNextClick }>{ strings.next }</button>
									}
								</div>
								{
									theme === 'bottom' &&
									<div className="col col-md-5">
										<button className="button-sm button-secondary-white full-width">{ strings.cancel_trade }</button>
									</div>
								}
								{
									theme === 'bottom' &&
									<div className="col col-md-5">
										<button className="button-sm button-yellow full-width">{ strings.confirm_and_continue }</button>
									</div>
								}
							</Row>
						}
						{
							!active && pass &&
							<Row className="no-margin align-items-center">
								<div className="col col-md-10 background-cream trade-c-child" >
									{ this.props.renderOnComplete }
								</div>
								<div className={ 'col col-md-2' }>
									{
										theme !== 'top' &&
										<label className="font18 text-primary clickable text-capitalize font-weight-semi-bold" onClick={ this.props.onEditClick }>{ strings.edit }</label>
									}
								</div>
							</Row>
						}
					</Collapse>
				</div>
			</Row>
		)
	}
}

Step.propTypes = {
	children: PropTypes.node,
	renderOnComplete: PropTypes.node,
	className: PropTypes.string,
	title: PropTypes.string,
	theme: PropTypes.string,
	active: PropTypes.bool,
	pass: PropTypes.bool,
	onNextClick: PropTypes.func,
	onEditClick: PropTypes.func,
	disabledNext: PropTypes.bool
}

export default Step
