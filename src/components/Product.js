import { useStateValue } from '../StateProvider'
import './Product.css'
import uuid from 'react-uuid'

function Product({ _key, id, title, className, image, price, rating }) {
	const [{ cart }, dispatch] = useStateValue()

	const addToCart = e => {
		e.target.disabled = true
		e.target.style = 'opacity: 0.5; cursor:no-drop;'
		const disableTimeout = setTimeout(() => {
			e.target.disabled = false
			e.target.style = 'opacity: 1; cursor:normal;'
			clearTimeout(disableTimeout)
		}, 1400)

		// dispatch the item into the data layer
		dispatch({
			type: 'ADD_TO_CART',
			item: {
				_key: uuid(),
				id,
				title,
				image,
				price,
				rating,
			},
		})
	}

	return (
		<div className={`product${className ? ' ' + className : ''}`}>
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

			<button
				onClick={e => {
					addToCart(e)
				}}
			>
				Add to cart
			</button>
		</div>
	)
}
export default Product
