import { useState, useEffect, useRef } from 'react'
// Importujemy dane bezpośrednio z JSONa
import reviewsData from '../../public/reviews.json'

const GoogleReviews = () => {
	const [reviews] = useState(reviewsData.reviews)
	const [currentIndex, setCurrentIndex] = useState(0)
	const containerRef = useRef(null)
	const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false)

	// Funkcja pomocnicza dla obrazków (opcjonalna przy lokalnych linkach, ale zostawiam dla elastyczności)
	const getProxiedImageUrl = originalUrl => {
		if (originalUrl.startsWith('http')) {
			return `https://images.weserv.nl/?url=${encodeURIComponent(originalUrl)}`
		}
		return originalUrl
	}

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		if (reviews.length <= 1) return

		const interval = setInterval(() => {
			setCurrentIndex(prevIndex => (prevIndex + 1 >= reviews.length ? 0 : prevIndex + 1))
		}, 5000)

		return () => clearInterval(interval)
	}, [reviews.length])

	const renderStars = rating => {
		return [...Array(5)].map((_, index) => (
			<span key={index} className={`text-lg mr-0.5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
				★
			</span>
		))
	}

	const trackStyle = {
		transform: isMobile ? `translateX(-${currentIndex * 104}%)` : `translateX(-${currentIndex * (100 / 3)}%)`,
		transition: 'transform 1s ease-in-out',
	}

	// Dodajemy kopie dla efektu płynności (zależnie od potrzeb)
	const duplicatedReviews = [...reviews, ...reviews.slice(0, 3)]

	if (reviews.length === 0) {
		return (
			<section className='bg-mainBg py-16 px-4 text-center'>
				<p className='text-gray-500 text-lg'>Brak opinii do wyświetlenia</p>
			</section>
		)
	}

	return (
		<section className='bg-mainBg py-16 px-4 md:px-8 overflow-hidden'>
			<p className='text-sm text-brownMain text-center uppercase tracking-wider'>Opinie</p>
			<h2 className='text-3xl font-semibold text-brownMain text-center mb-12'>Opinie naszych klientów</h2>

			<div className='max-w-6xl mx-auto relative overflow-hidden' ref={containerRef}>
				<div
					className='flex gap-4 md:gap-8 w-full [backface-visibility:hidden] [transform-style:preserve-3d] pt-4'
					style={trackStyle}>
					{duplicatedReviews.map((review, index) => (
						<div
							key={index}
							className='flex-none w-full md:w-[calc(33.333%-1.33rem)] bg-secondBg rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 transition-all duration-300 opacity-90 scale-95 hover:scale-100 hover:opacity-100'>
							<div className='flex justify-between items-start mb-6'>
								<div className='flex items-center gap-4'>
									<img
										src={getProxiedImageUrl(review.profile_photo_url)}
										alt={review.author_name}
										className='w-12 h-12 rounded-full object-cover shadow-sm'
										loading='lazy'
									/>
									<div>
										<h3 className='m-0 text-base font-bold text-gray-800 leading-tight'>{review.author_name}</h3>
										<div className='mt-1'>{renderStars(review.rating)}</div>
									</div>
								</div>
								<div className='text-gray-400 text-xs'>{new Date(review.time * 1000).toLocaleDateString('pl-PL')}</div>
							</div>
							<p className='text-sm leading-relaxed text-gray-600 italic m-0'>"{review.text}"</p>
						</div>
					))}
				</div>
			</div>

			<div className='flex justify-center gap-3 mt-10'>
				{reviews.map((_, index) => (
					<button
						key={index}
						className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-300 ${
							index === currentIndex ? 'bg-brownMain scale-125' : 'bg-gray-300 hover:bg-gray-400'
						}`}
						onClick={() => setCurrentIndex(index)}
						aria-label={`Przejdź do opinii ${index + 1}`}
					/>
				))}
			</div>
		</section>
	)
}

export default GoogleReviews
