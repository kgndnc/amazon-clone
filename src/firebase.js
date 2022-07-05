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
	setDoc,
	doc,
	onSnapshot,
	orderBy,
} from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'YOUR_PROJECT_API_KEY',
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
			await setDoc(doc(db, `users/${user.uid}`), {
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
const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password)
		const user = res.user
		// const name = email.slice(0, email.indexOf('@'))
		updateProfile(user, { name })
		await setDoc(doc(db, `users/${user.uid}`), {
			uid: user.uid,
			authProvider: 'local',
			email,
			name,
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
	} catch (err) {
		console.error(err)
		alert(err.message)
	}
}

export {
	auth,
	db,
	addDoc,
	setDoc,
	doc,
	collection,
	onSnapshot,
	orderBy,
	query,
	signInWithGoogle,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
	authStateChanged,
}
