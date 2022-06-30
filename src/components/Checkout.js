import './Checkout.css'
import Subtotal from './Subtotal'

function Checkout() {
	return (
		<div className='checkout'>
			<div className='checkout--left'>
				<img
					src='https://images-eu.ssl-images-amazon.com/images/G/41/TR-hq/2021/CE-SM/GamingStore/TR21_GAMING_STORE_Cat_Page_banner_1500x375.jpg'
					alt='Advertisement'
					className='checkout--ad'
				/>
				<div>
					<h2 className='checkout--title'>Your shopping cart</h2>
					{/* BasketItem */}
					{/* BasketItem */}
					{/* BasketItem */}
					{/* BasketItem */}
					{/* BasketItem */}
				</div>
			</div>

			<div className='checkout--right'>
				<Subtotal />
			</div>
		</div>
	)
}
export default Checkout
