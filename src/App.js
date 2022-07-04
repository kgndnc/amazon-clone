import Header from './components/Header'
import Home from './components/Home'
import Checkout from './components/Checkout'
import Login from './components/Login'
import Payment from './components/Payment'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useStateValue } from './StateProvider'

import { auth, authStateChanged } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

// For paymnet processing (stripe)
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './components/Orders'
import Footer from './components/Footer'
import Register from './components/Register'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

// you don't need to hide this key (or add it to .gitignore) don't worry it's public key
const promise = loadStripe(
	'pk_test_51LGtsAJ3wgzQ33d690fRata9KPGBUEETHT5pOVoaLWuSaVxAlae9x7IRKZr1erCN1CTOo25yUBwsUWmxWPKtK7J300pVg7v91S'
)

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
						path='/register'
						element={
							<>
								<Register />
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

								{/* For payment processing wrap Payment */}
								<Elements stripe={promise}>
									<Payment />
								</Elements>
							</>
						}
					/>
					<Route
						path='/orders'
						element={
							<>
								<Header />
								<Orders />
							</>
						}
					/>
					<Route
						path='/'
						element={
							<>
								<Header />
								<Home />
								<Footer />
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

