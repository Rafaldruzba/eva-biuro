import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Privacy from './pages/Privacy'
import Services from './pages/Services'
import ScrollToSection from './utils/ScrollToSection'
import ScrollToTop from './utils/ScrollToTop'

function App() {
	return (
		<Router>
			<div className='min-h-screen flex flex-col'>
				<Navbar />
				<ScrollToTop />
				<ScrollToSection />
				<main className='flex-grow'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cennik' element={<Pricing />} />
						<Route path='/uslugi' element={<Services />} />
						<Route path='/polityka-prywatnosci' element={<Privacy />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	)
}

export default App
