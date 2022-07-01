import './Header.css'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logout } from '../firebase'
function Header() {
	const [{ cart }, dispatch] = useStateValue()
	const [authUser, loading, error] = useAuthState(auth)

	const name = authUser?.email.slice(0, authUser?.email.indexOf('@'))

	console.log('authUser', authUser)

	const handleAuthentication = () => {
		if (authUser) {
			logout()
		} else {
		}
	}

	return (
		<div className='header'>
			<Link to='/'>
				<img
					className='header--logo'
					src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'
				/>
			</Link>

			<div className='header--search'>
				<input className='header--search-input' type='text' />
				<SearchIcon className='header--search-icon' />
			</div>

			<div className='header--nav'>
				<Link to={authUser ? '/' : `/login`}>
					<div className='header--option' onClick={handleAuthentication}>
						<span className='header--option-line-one'>
							Hello {authUser ? name : `Guest`}
						</span>
						<span className='header--option-line-two'>
							{authUser ? `Sign Out` : `Sign In`}
						</span>
					</div>
				</Link>
				<div className='header--option'>
					<span className='header--option-line-one'>Returns</span>
					<span className='header--option-line-two'>& Orders</span>
				</div>
				<div className='header--option'>
					<span className='header--option-line-one'>Your</span>
					<span className='header--option-line-two'>Prime</span>
				</div>

				<Link to='/checkout' className='header--option-basket'>
					<ShoppingCartIcon />
					<span className='header--option-line-two header--basket-count'>
						{cart?.length}
					</span>
				</Link>
			</div>
		</div>
	)
}
export default Header
