import React from 'react'
import checkMark from '../assets/icons/checkMark.svg'

const servicesData = {
	księgowość: {
		title: 'Księgowość',
		items: [
			'Prowadzenie Książki Przychodów i Rozchodów',
			'Prowadzenie rozliczeń ryczałtowych',
			'Sporządzanie deklaracji VAT oraz podatku dochodowego',
			'Sporządzanie deklaracji PIT oraz innych wymaganych do Urzędu skarbowego oraz ZUS',
		],
	},
	kadry: {
		title: 'Kadry i płace',
		items: [
			'Przygotowywanie skierowań na badania medyczny pracy, umów o pracę, aneksów, umów zlecenie oraz o dzieło etc.',
			'Zaświadczenia dla pracowników',
			'Prowadzenie i przechowywanie akt pracowniczych',
			'Naliczanie wynagrodzeń i świadczeń pracowniczych',
			'Sporządzenie list płac',
		],
	},
	działalność: {
		title: 'Założenie działalności',
		items: [
			'Wypełnienie formularza CEIDG oraz aktualizacja danych',
			'Sporządzanie deklaracji VAT-R',
			'Zgłoszenie do ZUS oraz aktualizacja danych',
			'Pomoc w założeniu działalności jest GRATIS',
		],
	},
	inne: {
		title: 'Inne',
		items: ['Kontakt z urzędami', 'Przygotowanie pism urzędowych', 'Wnioski do PUP etc.'],
	},
}

export default function Services() {
	return (
		<section id='oferta' className='py-16 bg-mainBg'>
			<div className='wrapper px-4 2xl:px-0'>
				<p className='text-sm text-brownMain text-center'>Moja oferta</p>
				<h2 className='text-3xl font-semibold text-brownMain text-center mb-8'>Zakres usług</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
					{Object.values(servicesData).map((category, index) => (
						<div key={index} className=' 2xl:p-5 rounded-lg '>
							<h3 className='text-xl font-semibold text-brownMain mb-4'>{category.title}</h3>
							<ul className='space-y-3'>
								{category.items.map((item, itemIndex) => (
									<li key={itemIndex} className='flex items-start'>
										<div className=' mr-2 flex-shrink-0 bg-gold w-7 h-7 flex items-center justify-center text-center rounded-xs'>
											<img src={checkMark} alt='checkmark' />
										</div>
										<span className='text-grayish text-[15px]'>{item}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
