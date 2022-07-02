import './Checkout.css'
import CartItem from './CartItem'
import Subtotal from './Subtotal'
import FlipMove from 'react-flip-move'
import { useStateValue } from '../StateProvider'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { useState } from 'react'

function Checkout() {
	const [{ cart }, dispatch] = useStateValue()
	const [cartState, setCartState] = useState(cart)
	const [user, loading, error] = useAuthState(auth)

	const ticketNotVisibleState = {
		transform: 'translateX(-100%)',
		opacity: 0.1,
	}

	return (
		<div className='checkout'>
			<div className='checkout--left'>
				<img
					src='https://images-eu.ssl-images-amazon.com/images/G/41/TR-hq/2021/CE-SM/GamingStore/TR21_GAMING_STORE_Cat_Page_banner_1500x375.jpg'
					alt='Advertisement'
					className='checkout--ad'
				/>
				<div className='cart'>
					<h3
						style={{
							marginTop: '20px',
							paddingLeft: '10px',
							fontSize: '18px',
							fontWeight: '600',
						}}
					>
						Hello{' '}
						{user
							? user.displayName
								? user.displayName
								: user.email
							: `Guest`}
					</h3>
					<h2 className='checkout--title'>Your shopping cart</h2>
					<FlipMove
						className='flip-wrapper'
						enterAnimation={{
							from: ticketNotVisibleState,
							to: {},
						}}
						leaveAnimation={{
							from: {},
							to: ticketNotVisibleState,
						}}
					>
						{cartState.map(item => (
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
					</FlipMove>
				</div>
			</div>

			<div className='checkout--right'>
				<Subtotal />
			</div>
		</div>
	)
}
export default Checkout
