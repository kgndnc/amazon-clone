import './Checkout.css'
import CartItem from './CartItem'
import Subtotal from './Subtotal'
import { useStateValue } from '../StateProvider'

function Checkout() {
	const [{ cart }, dispatch] = useStateValue()

	return (
		<div className='checkout'>
			<div className='checkout--left'>
				<img
					src='https://images-eu.ssl-images-amazon.com/images/G/41/TR-hq/2021/CE-SM/GamingStore/TR21_GAMING_STORE_Cat_Page_banner_1500x375.jpg'
					alt='Advertisement'
					className='checkout--ad'
				/>
				<div className='cart'>
					<h2 className='checkout--title'>Your shopping cart</h2>
					{cart.map(item => {
						return (
							<CartItem
								key={item._key}
								_key={item._key}
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						)
					})}
				</div>
			</div>

			<div className='checkout--right'>
				<Subtotal />
			</div>
		</div>
	)
}
export default Checkout
