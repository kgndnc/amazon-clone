import { useStateValue } from '../StateProvider'
import './Product.css'

function Product({ _key, id, title, className, image, price, rating }) {
	const [{ cart }, dispatch] = useStateValue()

	const addToCart = () => {
		const randNum = Math.ceil(Math.random() * 1000)
		// dispatch the item into the data layer
		dispatch({
			type: 'ADD_TO_CART',
			item: {
				_key: id + randNum,
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

			<button onClick={addToCart}>Add to cart</button>
		</div>
	)
}
export default Product
