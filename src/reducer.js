export const initialState = {
	cart: [],
}

export const getTotalPrice = cart =>
	cart?.reduce(
		(previousValue, currentValue) => previousValue + Number(currentValue.price),
		0
	)

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			return {
				...state,
				cart: [...state.cart, action.item],
			}

		case 'REMOVE_FROM_CART':
			return {
				...state,
				cart: state.cart.filter(item => item._key !== action._key),
			}

		case 'EMPTY_CART':
			return {
				...state,
				cart: [],
			}

		default:
			return state
	}
}

export default reducer
