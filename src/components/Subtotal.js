import { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { getTotalPrice } from '../reducer'
import { useStateValue } from '../StateProvider'
import { Tooltip, Zoom } from '@mui/material'

import './Subtotal.css'

function Subtotal() {
	const [{ cart }, dispatch] = useStateValue()
	const [user, loading, authError] = useAuthState(auth)

	const [isCartEmpty, setCartEmpty] = useState(true)

	const disabled = { opacity: '0.7', filter: 'none' }

	useEffect(() => {
		if (cart.length < 1) setCartEmpty(true)
		else setCartEmpty(false)
	}, [cart])

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
			<Tooltip
				title={user ? '' : 'You must be signed in to proceed'}
				arrow
				TransitionComponent={Zoom}
				TransitionProps={{ timeout: 200 }}
			>
				<button
					disabled={isCartEmpty || !user}
					style={isCartEmpty || !user ? disabled : {}}
					onClick={e => navigate('/payment')}
				>
					Proceed to checkout
				</button>
			</Tooltip>
		</div>
	)
}
export default Subtotal
