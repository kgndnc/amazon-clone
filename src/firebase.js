import { initializeApp } from 'firebase/app'
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	onAuthStateChanged,
	signOut,
	updateProfile,
} from 'firebase/auth'

import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
} from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyA_2le4vJ6ODxocUowIVcxbPm4cPTX_GWY',
	authDomain: 'clone-2b9d7.firebaseapp.com',
	projectId: 'clone-2b9d7',
	storageBucket: 'clone-2b9d7.appspot.com',
	messagingSenderId: '1020091254293',
	appId: '1:1020091254293:web:50bfe4633dc9f8acad701c',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()
const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider)
		const user = res.user
		const q = query(collection(db, 'users'), where('uid', '==', user.uid))
		const docs = await getDocs(q)
		if (docs.docs.length === 0) {
			await addDoc(collection(db, 'users'), {
				uid: user.uid,
				name: user.displayName,
				authProvider: 'google',
				email: user.email,
			})
		}
	} catch (err) {
		console.error(err)
		alert(err.message)
	}
}
const logInWithEmailAndPassword = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password)
	} catch (err) {
		console.error(err)
		alert(err.message)
	}
}
const registerWithEmailAndPassword = async (email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password)
		const user = res.user
		const name = email.slice(0, email.indexOf('@'))
		updateProfile(user, { displayName: name })
		await addDoc(collection(db, 'users'), {
			uid: user.uid,
			authProvider: 'local',
			email,
		})
	} catch (err) {
		console.error(err)
		alert(err.message)
	}
}
const sendPasswordReset = async email => {
	try {
		await sendPasswordResetEmail(auth, email)
		alert('Password reset link sent!')
	} catch (err) {
		console.error(err)
		alert(err.message)
	}
}
const logout = () => {
	signOut(auth)
	console.log('USER LOGGED OUT')
}
const authStateChanged = async function (authUser, dispatch) {
	try {
		await onAuthStateChanged(auth, authUser => {
			console.log('THE USER IS >>>> ', authUser)

			if (authUser) {
				// the user just logged in / the user was logged in

				dispatch({
					type: 'SET_USER',
					user: authUser,
				})
			} else {
				// the user is logged out
				dispatch({
					type: 'SET_USER',
					user: null,
				})
			}
		})
		alert('Some message')
	} catch (err) {
		console.error(err)
		alert(err.message)
	}
}

export {
	auth,
	db,
	signInWithGoogle,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
	authStateChanged,
}
