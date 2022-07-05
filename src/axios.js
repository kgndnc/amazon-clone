import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://us-central1-clone-2b9d7.cloudfunctions.net/api',
	// 'http://localhost:5001/clone-2b9d7/us-central1/api', // THE API (cloud function) URL (local machine)
})

export default instance
