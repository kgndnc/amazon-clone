import CurrencyFormat from 'react-currency-format'
import { useNavigate } from 'react-router-dom'
import { getTotalPrice } from '../reducer'
import { useStateValue } from '../StateProvider'

import './Subtotal.css'

function Subtotal() {
	const [{ cart }, dispatch] = useStateValue()
	const navigate = useNavigate()

	return (
		<div className='subtotal'>
			<CurrencyFormat
				renderText={value => (
					<>
						<p>
							Subtotal ({cart.length} items): <strong>{value}</strong>
						</p>
						<small className='subtotal--gift'>
							<input type='checkbox' name='gift' id='gift' /> This order
							contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={getTotalPrice(cart)}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'$'}
			/>
			<button onClick={e => navigate('/payment')}>Proceed to checkout</button>
		</div>
	)
}
export default Subtotal
