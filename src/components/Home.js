import './Home.css'
import Product from './Product'

function Home() {
	return (
		<div className='home'>
			<div className='home--container'>
				<img
					className='home--image'
					src='https://m.media-amazon.com/images/I/71e3fk5+a7L._SX3000_.jpg'
					alt='Home Image'
				/>
				<div className='home--row'>
					<Product
						id={1}
						title='Canon Camera'
						image='https://images-eu.ssl-images-amazon.com/images/G/41/TR-hq/2022/img/Consumer_Electronics/XCM_CUTTLE_1402831_2138440_TR_CUTTLE_379x304_1X_tr_TR._SY304_CB648318178_.jpg'
						price='79.99'
						rating={5}
					/>
					<Product
						id={2}
						title='Running Shoes'
						image='https://m.media-amazon.com/images/I/41ijX6+ImZL._AC_SY230_.jpg'
						price='39.99'
						rating={5}
					/>
				</div>
				<div className='home--row'>
					<Product
						id={3}
						title='Coffee Maker'
						image='https://images-eu.ssl-images-amazon.com/images/G/41/TR-hq/2021/Iltan/Kitchen/Evergreen/XCM_Manual_1309829_1579910_TR_TR_DEALS_tr_gw_pc_single_category_card_2x_tr_tr_3706338_379x304_1X_tr_TR._SY304_CB658837340_.jpg'
						price='60.99'
						rating={4}
					/>
					<Product
						id={4}
						title='PlayStation 5'
						image='https://m.media-amazon.com/images/I/51QOdeElCtL._AC_UY218_.jpg'
						price='499.99'
						rating={5}
					/>
					<Product
						id={5}
						title='Bosch'
						image='https://images-eu.ssl-images-amazon.com/images/G/41/TR-hq/2022/img/Home_Improvement/XCM_CUTTLE_2351624_379x304_1X_tr_TR._SY304_CB621764047_.jpg'
						price='40.05'
						rating={3}
					/>
				</div>
				<div className='home--row'>
					<Product
						id={6}
						title='LG LED TV'
						className='wide'
						image='https://m.media-amazon.com/images/I/61-8fUodSGL._AC_SL1100_.jpg'
						price='379.99'
						rating={5}
					/>
				</div>
			</div>
		</div>
	)
}
export default Home
