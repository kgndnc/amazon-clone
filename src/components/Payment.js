import { useStateValue } from '../StateProvider'
import { auth, logout } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import './Payment.css'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'

function Payment() {
	const [{ cart }, dispatch] = useStateValue()
	const [user, loading, error] = useAuthState(auth)

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

				{/* Payment section - payment method */}
				<div className='payment--section'>
					<div className='payment--title'>
						<h3>Payment Method</h3>
					</div>
					<div className='payment--details'>
						{/* Stripe magic will go here */}
					</div>
				</div>
			</div>
		</div>
	)
}
export default Payment
