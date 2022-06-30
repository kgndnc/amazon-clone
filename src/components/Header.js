import './Header.css'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'

function Header() {
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
				<div className='header--option'>
					<span className='header--option-line-one'>Hello Guest</span>
					<span className='header--option-line-two'>Sign In</span>
				</div>
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
						0
					</span>
				</Link>
			</div>
		</div>
	)
}
export default Header