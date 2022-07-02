import { useStateValue } from '../StateProvider'
import './CartItem.css'

function CartItem({ _key, id, title, image, price, rating }) {
	const [{ cart }, dispatch] = useStateValue()

	console.log('cart ------>', cart)
	const removeFromCart = () => {
		// remove item from cart
		dispatch({
			type: 'REMOVE_FROM_CART',
			_key,
		})
	}
	return (
		<div className='cart-item '>
			{/* Image */}
			<img src={image} className='cart-item--image' />

			{/* Info */}
			<div className='cart-item--info'>
				<p className='cart-item--title'>{title}</p>
				<p className='cart-item--price'>
					<strong>${price}</strong>
				</p>
				<div className='cart-item--rating'>
					<p>
						{Array(rating)
							.fill()
							.map(_ => '⭐')}
					</p>
				</div>
				{/* Remove from cart */}
				<button onClick={removeFromCart}>Remove from cart</button>
			</div>
		</div>
	)
}
export default CartItem
