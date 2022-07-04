import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
	auth,
	logInWithEmailAndPassword,
	signInWithGoogle,
	registerWithEmailAndPassword,
} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import './Login.css'

function Register() {
	const [name, setName] = useState('')
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

		if (!email || !password || !name) {
			alert('Please enter all fields')
			setPassword('')

			return
		}
		registerWithEmailAndPassword(name.trim(), email, password)
			.then(auth => {
				// successfully created user

				if (auth) {
					navigate('/')
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
				<h1>Sign up</h1>
				<form>
					<h5>User name</h5>
					<input
						type='text'
						name='username'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
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

					{/* <button
						className='login--signInButton'
						type='submit'
						onClick={e => signIn(e)}
					>
						Sign in
					</button> */}

					<button
						type='submit'
						className='login--registerButton'
						onClick={e => register(e)}
					>
						Create your Amazon account
					</button>
				</form>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
					eveniet illo, quis fugiat repellat unde dicta. Necessitatibus unde
					odit ea doloribus cupiditate, sequi animi. Pariatur odio facilis vitae
					vel minima.
				</p>
				<p>
					Already have an account? You can <Link to='/login'>sign in here</Link>
				</p>
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
		</div>
	)
}
export default Register
