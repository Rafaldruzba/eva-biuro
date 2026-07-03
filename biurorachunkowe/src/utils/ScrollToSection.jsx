import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToSection = () => {
	const { hash } = useLocation()

	useEffect(() => {
		if (hash) {
			const element = document.getElementById(hash.substring(1)) // Usuwa "#" z początku
			if (element) {
				const yOffset = -84 // Przesunięcie o wysokość nawigacji
				const y = element.getBoundingClientRect().top + window.scrollY + yOffset
				window.scrollTo({ top: y, behavior: 'smooth' })
			}
		}
	}, [hash])

	return null
}

export default ScrollToSection
