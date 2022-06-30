import './App.css'
import Header from './components/Header'
import Home from './components/Home'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Checkout from './components/Checkout'

function App() {
	return (
		<BrowserRouter>
			<div className='app'>
				<Header />
				<Routes>
					<Route
						path='/checkout'
						element={
							<>
								<Checkout />
							</>
						}
					/>
					<Route
						path='/'
						element={
							<>
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

