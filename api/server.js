import express from 'express'
import nodemailer from 'nodemailer'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors({ origin: ['http://localhost:3000', 'https://br-online.pl'], credentials: true }))
app.use(express.json()) // Do czytania body w formacie JSON

// Konfiguracja transportera e-mail
const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: parseInt(process.env.EMAIL_PORT || '465'),
	secure: process.env.EMAIL_PORT === '465', // true dla portu 465, false dla innych
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
})

app.post('/api/contact', async (req, res) => {
	const { email, message, subject } = req.body

	if (!email) {
		return res.status(400).json({ error: 'Adres e-mail jest wymagany.' })
	}

	try {
		await transporter.sendMail({
			from: `"Formularz Strony" <${process.env.EMAIL_USER}>`,
			to: process.env.EMAIL_USER,
			replyTo: email,
			subject: subject || 'Nowe zgłoszenie ze strony WWW',
			text: `Od: ${email}\n\nWiadomość:\n${message || 'Brak treści wiadomości.'}`,
			html: `<p><strong>Od:</strong> ${email}</p><p><strong>Wiadomość:</strong></p><p>${message || 'Brak treści.'}</p>`,
		})

		res.status(200).json({ success: true, message: 'Wiadomość została wysłana!' })
	} catch (error) {
		console.error('Błąd wysyłania maila:', error)
		res.status(500).json({ error: 'Nie udało się wysłać wiadomości.' })
	}
})

// 2. ENDPOINT: Pobieranie opinii z Google Maps
app.get('/api/reviews', async (req, res) => {
	const apiKey = process.env.GOOGLE_API_KEY
	const placeId = process.env.GOOGLE_PLACE_ID

	if (!apiKey || !placeId) {
		return res.status(500).json({ error: 'Brak konfiguracji Google API na serwerze.' })
	}

	// Używamy oficjalnego API tekstowego (New Places API), aby pobrać szczegóły miejsca wraz z opiniami po polsku
	const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&languageCode=pl&key=${apiKey}`

	try {
		const response = await axios.get(url)

		// Zwracamy opinie, ogólną ocenę i łączną liczbę opinii
		res.status(200).json({
			rating: response.data.rating,
			totalReviews: response.data.userRatingCount,
			reviews: response.data.reviews || [],
		})
	} catch (error) {
		console.error('Błąd pobierania opinii Google:', error?.response?.data || error.message)
		res.status(500).json({ error: 'Nie udało się pobrać opinii z Google.' })
	}
})

// Uruchomienie serwera
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Serwer działa na porcie ${PORT}`)
})
