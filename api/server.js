import express from 'express'
import nodemailer from 'nodemailer'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'

dotenv.config()

console.log('Wczytano zmienne środowiskowe:', {
	RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
})
const app = express()

// Włączamy odczyt prawdziwego IP użytkownika z nagłówków proxy Hostingera
app.set('trust proxy', 1)

app.use(cors({ origin: ['http://localhost:5173', 'https://br-online.pl'], credentials: true }))
app.use(express.json())

// ENDPOINT: Health Check (Sprawdzanie stanu serwera)
app.get('/api/health', (req, res) => {
	console.log('Health check endpoint accessed.')
	res.status(200).json({
		status: 'UP',
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	})
})

// 1. OGRANICZENIE IP (Rate Limiting)
// Maksymalnie 3 wysłane formularze z jednego adresu IP na 15 minut
const contactLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 3,
	standardHeaders: true,
	legacyHeaders: false,
	message: { error: 'Zbyt wiele zgłoszeń z tego adresu IP. Spróbuj ponownie za kilkanaście minut.' },
})

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

// ENDPOINT: Formularz kontaktowy z zabezpieczeniami
app.post('/api/contact', contactLimiter, async (req, res) => {
	const { email, message, subject, firstName, phone, recaptchaToken } = req.body

	// Podstawowa walidacja pól
	if (!email) {
		return res.status(400).json({ error: 'Adres e-mail jest wymagany.' })
	}

	if (!recaptchaToken) {
		return res.status(400).json({ error: 'Brak tokenu weryfikacyjnego CAPTCHA.' })
	}

	try {
		// 2. WERYFIKACJA RECAPTCHA V3 W GOOGLE
		const googleRes = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
			params: {
				secret: process.env.RECAPTCHA_SECRET_KEY,
				response: recaptchaToken,
			},
		})

		console.log('Odpowiedź z Google reCAPTCHA:', googleRes.data)

		// Odrzucamy boty (score poniżej 0.5 oznacza wysokie prawdopodobieństwo bota)
		if (!googleRes.data.success || googleRes.data.score < 0.5) {
			console.log('Odrzucono! Score:', googleRes.data.score, 'Błędy:', googleRes.data['error-codes'])
			return res.status(400).json({ error: 'Weryfikacja antyspamowa nie powiodła się.' })
		}

		// Poczta wysyła się równolegle
		Promise.allSettled([
			// Mail do biura
			transporter.sendMail({
				from: `"Formularz Strony" br-online@br-online.pl`,
				to: process.env.EMAIL_USER,
				replyTo: email,
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
			}),
			// // Autoresponder do klienta
			// transporter.sendMail({
			// 	from: `"Biuro Rachunkowe Ewa Reluga" <${process.env.EMAIL_USER}>`,
			// 	to: email,
			// 	subject: 'Potwierdzenie otrzymania wiadomości',
			// 	html: `
			//     <div style="background-color: #fdfdfd; padding: 40px 20px; font-family: 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6;">
			//         <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border: 1px solid #eeeeee; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">

			//             <div style="height: 4px; background: linear-gradient(to right, #3498db, #2c3e50);"></div>

			//             <div style="padding: 40px 30px;">
			//                 <h2 style="color: #2c3e50; margin-top: 0; font-size: 20px;">Dzień dobry, ${firstName || 'Szanowny Kliencie'}!</h2>

			//                 <p style="color: #4f5f6f; font-size: 15px;">
			//                     Dziękuję za przesłanie formularza i zainteresowanie moimi usługami. Potwierdzam, że Twoja wiadomość dotarła do mnie bezpiecznie.
			//                 </p>

			//                 <p style="color: #4f5f6f; font-size: 15px;">
			//                     Zapoznam się z Twoim opisem i postaram się odpowiedzieć tak szybko, jak to możliwe (zazwyczaj zajmuje mi to do 24 godzin).
			//                 </p>

			//                 <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #f0f0f0;">
			//                     <p style="margin: 0; color: #2c3e50; font-weight: bold;">Pozdrawiam,</p>
			//                     <p style="margin: 5px 0 0 0; color: #3498db; font-size: 18px; font-family: Georgia, serif;">Ewa Reluga</p>
			//                 </div>
			//             </div>

			//             <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 11px; color: #bdc3c7;">
			//                 Nie odpowiadaj na tę wiadomość.
			//             </div>
			//         </div>
			//     </div>
			// `,
			// }),
		]).then(results => {
			results.forEach((result, idx) => {
				if (result.status === 'rejected') {
					console.error(`Błąd podczas wysyłania e-maila nr ${idx + 1}:`, result.reason)
				}
			})
		})

		// Zwracamy odpowiedź natychmiast bez czekania na SMTP
		return res.status(200).json({ success: true, message: 'Wiadomość została wysłana!' })
	} catch (error) {
		console.error('Błąd wysyłania maila:', error)
		res.status(500).json({ error: 'Nie udało się wysłać wiadomości.' })
	}
})

// ENDPOINT: Pobieranie opinii z Google Maps
app.get('/api/reviews', async (req, res) => {
	const apiKey = process.env.GOOGLE_API_KEY
	const placeId = process.env.GOOGLE_PLACE_ID

	if (!apiKey || !placeId) {
		return res.status(500).json({ error: 'Brak konfiguracji Google API na serwerze.' })
	}

	const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&languageCode=pl&key=${apiKey}`

	try {
		const response = await axios.get(url)

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
