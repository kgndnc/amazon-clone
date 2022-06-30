import CurrencyFormat from 'react-currency-format'
import './Subtotal.css'

function Subtotal() {
	return (
		<div className='subtotal'>
			<CurrencyFormat
				renderText={value => (
					<>
						<p>
							Subtotal (0 items): <strong>0</strong>
						</p>
						<small className='subtotal--gift'>
							<input type='checkbox' name='gift' id='gift' /> This order
							contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={81}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'$'}
			/>
			<button>Proceed to checkout</button>
		</div>
	)
}
export default Subtotal
