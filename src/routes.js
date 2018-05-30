import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Async from 'react-code-splitting'
import HeaderDashboard from './containers/HeaderDashboard'
import CopyRight from './components/CopyRight'
// auth check
import AuthCheck from './authcheck'
import AuthBackCheck from './authbackcheck'

import { CircleBig } from 'images'
import Alert from './containers/Alert'
import Prompt from './containers/Prompt'

const Home = props => <Async load={ import('./containers/Home') } componentProps={ props }/>
const Header = props => <Async load={ import('./containers/Header') } componentProps={ props }/>
const Confirmation = props => <Async load={ import('./containers/Confirmation') } componentProps={ props }/>
const SecondRegistration = props => <Async load={ import('./containers/SecondRegistration') } componentProps={ props }/>
const Post = props => <Async load={ import('./containers/Post') } componentProps={ props }/>
const Transaction = props => <Async load={ import('./containers/Transaction') } componentProps={ props }/>
const Recipient = props => <Async load={ import('./containers/Recipient') } componentProps={ props }/>
const TradeConfirmation = props => <Async load={ import('./containers/TradeConfirmation') } componentProps={ props }/>
const ForgotPassword = props => <Async load={ import('./containers/ForgotPassword') } componentProps={ props }/>
const EmailForgot = props => <Async load={ import('./containers/EmailForgot') } componentProps={ props }/>
const ResetPassword = props => <Async load={ import('./containers/ResetPassword') } componentProps={ props }/>
const PaymentTrade = props => <Async load={ import('./containers/PaymentTrade') } componentProps={ props }/>
const PickConfirmation = props => <Async load={ import('./containers/PickConfirmation') } componentProps={ props }/>
const Profile = props => <Async load={ import('./containers/Profile') } componentProps={ props }/>







class Routes extends Component {
	
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0)
		}
	}
    
	render(){
		//routing for user
		const DashboardPage = () => {
			return(
				<div>
					<HeaderDashboard
						activePage={ this.props.location.pathname.split('/')[2] }
						location={ this.props.location }
					/>
					<div className="position-relative">
						<Route path='/dashboard/post' component={ Post } />             
						<Route path='/dashboard/transaction' component={ Transaction } />             
						<Route path='/dashboard/tradeconfirmation' component={ TradeConfirmation } />         
						<Route path='/dashboard/pickconfirmation' component={ PickConfirmation } />         
						<Route path='/dashboard/recipient' component={ Recipient } />  
						<Route path='/dashboard/paymenttrade' component={ PaymentTrade } />  
						<Route path='/dashboard/profile' component={ Profile } />  
						<img src={ CircleBig } className="circle-big" />    
					</div>
					<CopyRight theme='light' />
				</div>
			)
		}
		return(
			<div>
				{//not using header
					this.props.location.pathname === '/' ?
						<Header/>
						: null
				}
				<Route exact path="/" component={ AuthBackCheck(Home) } />
				<Route path="/confirmation" component={ Confirmation } />
				<Route path="/dashboard" component={ AuthCheck(DashboardPage) } />
				<Route path="/secondregistration" component={ SecondRegistration } />
				<Route path="/forgotpassword" component={ ForgotPassword } />
				<Route path="/forgotpasswordemail" component={ EmailForgot } />
				<Route path="/resetpassword" component={ ResetPassword } />
				{/* alert */}
				<Alert />
				<Prompt />
			</div>
		)
	}
}

Routes.propTypes = {
	location: PropTypes.object,
}



export default Routes

