import Header from './components/Header'
import Home from './components/Home'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Checkout from './components/Checkout'
import Login from './components/Login'
import { useStateValue } from './StateProvider'
import { auth, authStateChanged } from './firebase'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Payment from './components/Payment'

function App() {
	const [{}, dispatch] = useStateValue()
	const [user, loading, error] = useAuthState(auth)

	useEffect(() => {
		// will only run once when the app component loads
		authStateChanged(user, dispatch)
	}, [])

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
						path='/payment'
						element={
							<>
								<Header />
								<Payment />
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

