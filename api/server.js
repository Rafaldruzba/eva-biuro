import express from 'express'
import nodemailer from 'nodemailer'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors({ origin: ['http://localhost:5173', 'https://br-online.pl'], credentials: true }))
app.use(express.json())

// Konfiguracja transportera e-mail
const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: parseInt(process.env.EMAIL_PORT || '465'),
	secure: process.env.EMAIL_PORT === '465',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
})

app.post('/api/contact', async (req, res) => {
	const { email, message, subject, firstName, phone } = req.body

	if (!email) {
		return res.status(400).json({ error: 'Adres e-mail jest wymagany.' })
	}

	try {
		// 1. MAIL DO CIEBIE (BIURO RACHUNKOWE) - Informacja o nowym kliencie
		await transporter.sendMail({
			from: `"Formularz Strony" <${process.env.EMAIL_USER}>`,
			to: process.env.EMAIL_USER, // Trafia do Ciebie
			replyTo: email, // Kliknięcie "Odpowiedz" w programie pocztowym odpisze do klienta
			subject: subject || `Nowe zgłoszenie od ${firstName || 'Klienta'}`,
			text: `Masz nową wiadomość z formularza!\n\nImię: ${firstName || 'Nie podano'}\nE-mail: ${email}\nTelefon: ${phone || 'Nie podano'}\n\nWiadomość:\n${message || 'Brak treści wiadomości.'}`,
			html: `
				<div style="font-family: sans-serif; line-height: 1.5; color: #333;">
					<h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Nowe zgłoszenie ze strony WWW</h2>
					<p><strong>Imię:</strong> ${firstName || 'Nie podano'}</p>
					<p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
					<p><strong>Telefon:</strong> ${phone || 'Nie podano'}</p>
					<p><strong>Wiadomość:</strong></p>
					<div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; white-space: pre-wrap;">${message || 'Brak treści wiadomości.'}</div>
				</div>
			`,
		})

		// 2. MAIL DO KLIENTA - Automatyczne potwierdzenie (Twój ładny szablon HTML)
		await transporter.sendMail({
			from: `"Biuro Rachunkowe Ewa Reluga" <${process.env.EMAIL_USER}>`,
			to: email, // Trafia do klienta, który wypełnił formularz
			subject: 'Potwierdzenie otrzymania wiadomości',
			html: `
				<div style="background-color: #fdfdfd; padding: 40px 20px; font-family: 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6;">
					<div style="max-width: 500px; margin: 0 auto; background: #ffffff; border: 1px solid #eeeeee; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
						
						<div style="height: 4px; background: linear-gradient(to right, #3498db, #2c3e50);"></div>

						<div style="padding: 40px 30px;">
							<h2 style="color: #2c3e50; margin-top: 0; font-size: 20px;">Dzień dobry, ${firstName || 'Szanowny Kliencie'}!</h2>
							
							<p style="color: #4f5f6f; font-size: 15px;">
								Dziękuję za przesłanie formularza i zainteresowanie moimi usługami. Potwierdzam, że Twoja wiadomość dotarła do mnie bezpiecznie.
							</p>
							
							<p style="color: #4f5f6f; font-size: 15px;">
								Zapoznam się z Twoim opisem i postaram się odpowiedzieć tak szybko, jak to możliwe (zazwyczaj zajmuje mi to do 24 godzin).
							</p>

							<div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #f0f0f0;">
								<p style="margin: 0; color: #2c3e50; font-weight: bold;">Pozdrawiam,</p>
								<p style="margin: 5px 0 0 0; color: #3498db; font-size: 18px; font-family: Georgia, serif;">Ewa Reluga</p>
							</div>
						</div>

						<div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 11px; color: #bdc3c7;">
							To jest automatyczne potwierdzenie otrzymania wiadomości.<br>
							Nie musisz na nie odpowiadać.
						</div>
					</div>
				</div>
			`,
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
