import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
	auth,
	logInWithEmailAndPassword,
	signInWithGoogle,
	registerWithEmailAndPassword,
} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import './Login.css'

function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [user, loading, error] = useAuthState(auth)

	const navigate = useNavigate()

	useEffect(() => {
		if (loading) {
			// maybe trigger a loading screen
		} else if (user) {
			console.log('User already logged in')
			navigate('/')
		}
	}, [user, loading])

	const register = e => {
		e.preventDefault()

		if (!email) alert('Please enter email')
		registerWithEmailAndPassword(email, password)
			.then(auth => {
				// successfully created user
				console.log(auth)
				if (auth) {
					navigate('/')
				}
			})
			.catch(error => alert(error.message))
	}

	const signIn = e => {
		e.preventDefault()

		// firebase login stuff...
		logInWithEmailAndPassword(email, password)
			.then(auth => {
				if (user) navigate('/')
				else {
					setPassword('')
				}
			})
			.catch(error => alert(error.message))
	}

	return (
		<div className='login'>
			<Link to='/'>
				<img
					className='login--logo'
					src='http://file.wikipediam.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png'
				/>
			</Link>

			<div className='login--container'>
				<h1>Sign in</h1>
				<form>
					<h5>E-mail</h5>
					<input
						type='email'
						name='email'
						value={email}
						onChange={e => setEmail(e.target.value.trim())}
					/>

					<h5>Password</h5>
					<input
						type='password'
						name='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>

					<button
						className='login--signInButton'
						type='submit'
						onClick={e => signIn(e)}
					>
						Sign in
					</button>
				</form>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
					eveniet illo, quis fugiat repellat unde dicta. Necessitatibus unde
					odit ea doloribus cupiditate, sequi animi. Pariatur odio facilis vitae
					vel minima.
				</p>
				<button className='login--registerButton' onClick={e => register(e)}>
					Create your Amazon account
				</button>
			</div>
		</div>
	)
}
export default Login
