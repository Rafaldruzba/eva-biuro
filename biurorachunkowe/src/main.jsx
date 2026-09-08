import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<GoogleReCaptchaProvider reCaptchaKey='6LchTbAtAAAAAOwRzJxWdWHgpY_HomUovJxSoceP'>
		<StrictMode>
			<App />
		</StrictMode>
	</GoogleReCaptchaProvider>,
)
