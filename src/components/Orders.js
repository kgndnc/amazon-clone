import './Orders.css'
import Order from './Order'

import { db, onSnapshot, auth, collection, orderBy, query } from '../firebase'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import { where } from 'firebase/firestore'

function Orders() {
	const [orders, setOrders] = useState([])
	const [user, loading, error] = useAuthState(auth)

	useEffect(() => {
		if (user) {
			const ordersRef = collection(db, `users/${user?.uid}/orders`)
			const q = query(
				ordersRef,
				orderBy('created', 'desc'),
				where('uid', '==', user.uid)
			)

			onSnapshot(q, snapshot => {
				setOrders(
					snapshot.docs.map(doc => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			})

			// onSnapshot(
			// 	collection(db, `users/${user?.uid}/orders/`).orderBy('created', 'desc'),
			// 	snapshot => {
			// 		setOrders(
			// 			snapshot.docs.map(doc => ({
			// 				id: doc.id,
			// 				data: doc.data(),
			// 			}))
			// 		)
			// 	}
			// )
		} else {
			setOrders([])
		}

		// db.collection('users')
		// 	.doc(user?.uid)
		// 	.collection('orders')
		// 	.orderBy('created', 'desc')
		// 	.onSnapshot(snapshot => {
		// 		setOrders(
		// 			snapshot.docs.map(doc => ({
		// 				id: doc.id,
		// 				data: doc.data(),
		// 			}))
		// 		)
		// 	})
	}, [])

	return (
		<div className='orders'>
			{user ? (
				<>
					<h1>Your orders</h1>
					<div className='orders--order'>
						{orders?.map(order => {
							return <Order order={order} key={order.id} />
						})}
					</div>
				</>
			) : (
				<h4 style={{ marginTop: 40, fontWeight: 400 }}>
					<Link to='/login'>Sign in</Link> to see your order history
				</h4>
			)}
		</div>
	)
}
export default Orders
