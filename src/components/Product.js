import { useStateValue } from '../StateProvider'
import './Product.css'

function Product({ id, title, image, price, rating }) {
	const [{ cart }, dispatch] = useStateValue()

	console.log('cart :>> ', cart)

	const addToCart = () => {
		// dispatch the item into the data layer
		dispatch({
			type: 'ADD_TO_CART',
			item: {
				id,
				title,
				image,
				price,
				rating,
			},
		})
	}

	return (
		<div className={`product${title === 'LG OLED TV' ? ' wide' : ''}`}>
			<div className='product--info'>
				<p>{title}</p>
				<p className='product--price'>
					<small>$ </small>
					<strong>{price}</strong>
				</p>
				<div className='producting--rating'>
					<p>
						{Array(rating)
							.fill()
							.map(_ => '⭐')}
					</p>
				</div>
			</div>
			<img src={image} />

			<button onClick={addToCart}>Add to cart</button>
		</div>
	)
}
export default Product
