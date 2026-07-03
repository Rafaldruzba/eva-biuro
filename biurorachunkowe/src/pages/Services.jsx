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
		<>
			<div className='bg-mainBg pt-48 pb-32'>
				<div className='wrapper px-4'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-5xl font-semibold text-brownMain tracking-tight'>Zakres usług</h1>
						<h2 className='text-4xl md:text-5xl text-brownMain mb-3 tracking-tight'>Biuro rachunkowe OnLine</h2>
						<div className='text-grayishSecondary text-sm space-y-1 leading-4'>
							<p className='max-w-[400px] mx-auto'>
								Oferujemy kompleksową obsługę księgową, kadrową i podatkową dla firm oraz osób fizycznych prowadzących
								działalność gospodarczą.
							</p>
						</div>
					</div>
				</div>
			</div>

			<section className='py-16 bg-secondBg'>
				<div className='wrapper px-4 2xl:px-0'>
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
		</>
	)
}
