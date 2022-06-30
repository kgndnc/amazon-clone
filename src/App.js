import './App.css'
import Header from './components/Header'
import Home from './components/Home'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Checkout from './components/Checkout'
import Login from './components/Login'

function App() {
	return (
		<BrowserRouter>
			<div className='app'>
				<Routes>
					<Route
						path='/login'
						element={
							<>
								<Login />
							</>
						}
					/>
					<Route
						path='/checkout'
						element={
							<>
								<Header />
								<Checkout />
							</>
						}
					/>
					<Route
						path='/'
						element={
							<>
								<Header />
								<Home />
							</>
						}
					/>
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App

