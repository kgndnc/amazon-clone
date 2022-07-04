import './Order.css'
import moment from 'moment'
import CartItem from './CartItem'
import CurrencyFormat from 'react-currency-format'

function Order({ order }) {
	return (
		<div className='order'>
			<h3>Order</h3>
			<p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
			<p className='order--id'>
				<small>{order.id}</small>
			</p>
			{order.data.cart?.map(item => (
				<CartItem
					key={item._key}
					_key={item._key}
					id={item.id}
					title={item.title}
					image={item.image}
					price={item.price}
					rating={item.rating}
					hideButton={true}
				/>
			))}
			<CurrencyFormat
				renderText={value => (
					<h3 className='order--total'>Order Total : {value}</h3>
				)}
				decimalScale={2}
				value={order.data.amount / 100}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'$'}
			/>
		</div>
	)
}
export default Order
