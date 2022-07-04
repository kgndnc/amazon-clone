import './Footer.css'

function Footer() {
	return (
		<div className='footer'>
			<div
				className='navFooterBackToTop'
				onClick={() => {
					window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
				}}
			>
				<span className='navFooterBackToTopText'>Back to top</span>
			</div>

			<div className='navFooterVerticalColumn'>
				<div className='navFooterVerticalRow'>
					<div className='navFooterLinkCol'>
						<div className='navFooterColHead'>Get to Know Us</div>
						<ul>
							<li className='nav-first'>Careers</li>
							<li>Blog</li>
							<li>About Amazon</li>
							<li>Investor Relations</li>
							<li>Amazon Devices</li>
							<li className='nav_last'>Amazon Science</li>
						</ul>
					</div>

					<div className='navFooterLinkCol'>
						<div className='navFooterColHead'>Make Money with Us</div>
						<ul>
							<li className='nav-first'>Sell products on Amazon</li>
							<li>Sell on Amazon Business</li>
							<li>Sell apps on Amazon</li>
							<li>Become an Affiliate</li>
							<li>Advertise Your Products</li>
							<li>Self-Publish with Us</li>
							<li>Host an Amazon Hub</li>
							<li className='nav_last nav_a_carat'>
								<span className='nav_a_carat'></span>
								See More Make Money with Us
							</li>
						</ul>
					</div>

					<div className='navFooterLinkCol'>
						<div className='navFooterColHead'>Amazon Payment Products</div>
						<ul>
							<li className='nav-first'>Amazon Business Card</li>
							<li>Shop with Points</li>
							<li>Reload Your Balance</li>
							<li className='nav_last'>Amazon Currency Converter</li>
						</ul>
					</div>

					<div className='navFooterLinkCol '>
						<div className='navFooterColHead'>Let Us Help You</div>
						<ul>
							<li className='nav-first'>Amazon and COVID-19</li>
							<li>Your Account</li>
							<li>Your Orders</li>
							<li>Shipping Rates &amp; Policies</li>
							<li>Returns &amp; Replacements</li>
							<li>Manage Your Content and Devices</li>
							<li>Amazon Assistant</li>
							<li className='nav_last'>Help</li>
						</ul>
					</div>
				</div>
			</div>
			<div className='nav-footer-logo'>
				<img
					className='footer--logo'
					src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'
				/>
			</div>
		</div>
	)
}
export default Footer
