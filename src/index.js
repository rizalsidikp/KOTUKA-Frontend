import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route } from 'react-router-dom'

//redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import { store, persistor } from './store'
import 'react-table/react-table.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-select-plus/dist/react-select-plus.css'
import 'bootstrap/dist/css/bootstrap.css'

import './styles/index.scss'
import './styles/colors.scss'

import Routes from './routes'
import history from './history'
import config from './config'

class App extends React.Component {
	componentWillMount(){
		if(localStorage.getItem('version')){
			if(parseInt(localStorage.getItem('version')) !== config.VERSION){
				localStorage.clear()
				localStorage.setItem('version', config.VERSION)
				location.reload()
			}
		}else{
			localStorage.clear()
			localStorage.setItem('version', config.VERSION)
			location.reload()
		}
	}
	render(){
		return(
			<Provider store={ store }>
				<PersistGate
					persistor={ persistor }
				>
					<Router history={ history }>
						<Route component={ Routes } />
					</Router>
				</PersistGate>
			</Provider>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))