import './Login.css'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import {
	auth,
	logInWithEmailAndPassword,
	signInWithGoogle,
	registerWithEmailAndPassword,
} from '../firebase'

import { useAuthState } from 'react-firebase-hooks/auth'

// export const loadingElement = (
// 	<div className='loading-container'>
// 		<ReactLoading className='loading' type='balls' color='#f0c14b' />
// 	</div>
// )

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
			<img
				className='login--logo'
				onClick={() => {
					navigate('/')
				}}
				src='http://file.wikipediam.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png'
			/>

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
				<p>
					Don't have an account? You can{' '}
					<Link to='/register'>sign up here</Link>
				</p>
				<button
					className='login--registerButton'
					onClick={() => navigate('/register')}
				>
					Go to Sign up page
				</button>

				<h5 className='options-text'>Other options</h5>

				<div className='google-btn-wrapper'>
					<div className='google-btn' onClick={() => signInWithGoogle()}>
						<div className='google-icon-wrapper'>
							<img
								className='google-icon'
								src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
							/>
						</div>
						<p className='btn-text'>
							<b>Sign in with Google</b>
						</p>
					</div>
				</div>
			</div>
			{/*  */}

			{/* <button onClick={() => signInWithGoogle()}>Sign in with Google</button> */}
		</div>
	)
}
export default Login
