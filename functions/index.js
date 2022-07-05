const functions = require('firebase-functions')
require('dotenv').config()
const express = require('express')
const cors = require('cors')

// initialize stripe with secret key (from developer tab in stripe website dashboard)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// - API

// - App config
const app = express()

// - Middlewares
app.use(cors({ origin: true }))
app.use(express.json())

// - API routes
app.get('/', (request, response) =>
	response.status(200).send('<h1>Hello, World!</h1>')
)

// Same URL in Payment.js getClientSecret() method
app.post('/payments/create', async (req, res) => {
	const { total } = req.query
	console.log('payment request received BOOOMM!!! amount >>>> ', total)

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total, // sub-units of currency (cent or kurus)
		currency: 'usd',
	})

	// OK - Created
	res.status(201).json({
		clientSecret: paymentIntent.client_secret,
	})
})

// - Listen command
// cloud function setup
exports.api = functions.https.onRequest(app)

// to emulate it on your local device type this line in command line
// firebase emulators:start

// API endpoint
// Add this to axios baseUrl
// http://localhost:5001/clone-2b9d7/us-central1/api/
// After deploying change the url above

