import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from './CartItem'
import './Payment.css'

import { useStateValue } from '../StateProvider'
import { auth, db, setDoc, doc } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getTotalPrice } from '../reducer'
import axios from '../axios'

function Payment() {
	const [{ cart }, dispatch] = useStateValue()
	const [user, loading, authError] = useAuthState(auth)

	const [error, setError] = useState(null)
	const [disabled, setDisabled] = useState(true)

	const [succeeded, setSucceeded] = useState(false)
	const [processing, setProcessing] = useState('')

	const [clientSecret, setClientSecret] = useState(true)

	const navigate = useNavigate()

	// !!! IMPORTANT !!!
	// PAYMENT PROCESSING
	useEffect(() => {
		// generate the special stripe secret which allows us to charge a customer

		const getClientSecret = async () => {
			const response = await axios({
				method: 'POST',
				// ücreti kuruş veya cent cinsinden yazman gerekiyor
				// 12 USD --> 12000
				url: `/payments/create?total=${(getTotalPrice(cart) * 100).toFixed(0)}`,
			})
			setClientSecret(response.data.clientSecret)
		}
		getClientSecret()
	}, [cart])

	const stripe = useStripe()
	const elements = useElements()

	const handleSubmit = async event => {
		event.preventDefault()

		// do all fancy stripe stuff

		// prevent the user to click the button again and again
		setProcessing(true)

		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				// payment intent = payment confirmation

				// save the order to the database (order history) with payment id
				setDoc(doc(db, `users/${user?.uid}/orders/`, paymentIntent.id), {
					uid: user?.uid,
					amount: paymentIntent.amount,
					cart: cart,
					created: paymentIntent.created,
				})

				// addDoc(collection(db, `users/${user?.uid}/orders`), {
				// 		cart: cart,
				// 		amount: paymentIntent.amount,
				// 		created: paymentIntent.created,
				// 	})

				// this is the same as above (above is done with modular methods)
				// db.collection('users')
				// 	.doc(user?.uid)
				// 	.collection('orders')
				// 	.doc(paymentIntent.id)
				// 	.set({
				// 		cart: cart,
				// 		amount: paymentIntent.amount,
				// 		created: paymentIntent.created,
				// 	})

				setSucceeded(true)
				setError(null)
				setProcessing(false)

				dispatch({
					type: 'EMPTY_CART',
				})

				// navigate to orders page after payment process has completed
				// replace:true = history.replace('/path')
				// so that user can't go back to this page
				navigate('/orders', { replace: true })
			})
	}

	const handleChange = event => {
		// Listen for changes in the Card Element
		// and display any errors as the customer types their card details
		setDisabled(event.empty)
		setError(event.error ? event.error.message : '')
	}

	return (
		<div className='payment'>
			<div className='payment--container'>
				<h1>
					Checkout (<Link to='/checkout'>{cart?.length} items</Link>)
				</h1>

				{/* Payment section - delivery address */}
				<div className='payment--section'>
					<div className='payment--title'>
						<h3>Delivery Address</h3>
					</div>
					<div className='payment--address'>
						<p>{user?.email}</p>
						<p>123 React Lane</p>
						<p>Miami, FL</p>
					</div>
				</div>

				{/* Payment section - review items */}
				<div className='payment--section'>
					<div className='payment--title'>
						<h3>Review items and delivery</h3>
					</div>
					<div className='payment--items'>
						{/* All products */}
						{cart.map(item => (
							<CartItem
								key={item._key}
								_key={item._key}
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))}
					</div>
				</div>
				<p className='test-info'>
					Try 4242 4242 4242 4242 for the card number and any date in the future
					to test payment.
				</p>
				{/* Payment section - payment method */}
				<div className='payment--section'>
					<div className='payment--title'>
						<h3>Payment Method</h3>
					</div>
					<div className='payment--details'>
						{/* Stripe magic will go here */}
						<form onSubmit={handleSubmit}>
							<br />
							<CardElement onChange={handleChange} />
							<div className='payment--priceContainer'>
								<CurrencyFormat
									renderText={value => (
										<>
											<h3>
												Order Total: <strong>{value}</strong>
											</h3>
										</>
									)}
									decimalScale={2}
									value={getTotalPrice(cart)}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'$'}
								/>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>Processing</p> : 'Buy Now'} </span>
								</button>
							</div>

							{/* Errors */}
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Payment
