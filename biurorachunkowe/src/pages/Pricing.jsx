import { Link } from 'react-router-dom'
import pricingData from '../data/pricingData'

export default function Pricing() {
	return (
		<>
			<div className='bg-mainBg pt-48 pb-32'>
				<div className='wrapper px-4'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-5xl font-semibold text-brownMain tracking-tight'>Cennik usług</h1>
						<h2 className='text-4xl md:text-5xl text-brownMain mb-3 tracking-tight'>Biuro rachunkowe OnLine</h2>
						<div className='text-grayishSecondary text-sm space-y-1 leading-4'>
							<p className='max-w-[400px] mx-auto'>
								Przedstawiony poniżej cennik nie stanowi oferty w rozumieniu art. 66, Kodeksu Cywilnego. Służy on do
								wyliczenia kosztów współpracy z biurem. Podane ceny usług są cenami{' '}
								<span className='font-semibold'>brutto</span>.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className='bg-secondBg py-16'>
				<div className='wrapper px-4'>
					<div className='mb-16'>
						<h3 className='text-center text-xl md:text-2xl bg-brownMain text-white md:text-brownMain md:bg-inherit font-semibold md:mb-8 p-4 w-full md:max-w-[500px] mx-auto'>
							Podatkowa Księga Przychodów i Rozchodów oraz ryczałt
						</h3>
						{/* Desktop */}
						<div className='hidden md:block bg-white rounded-lg shadow-normal'>
							<table className='w-full'>
								<thead>
									<tr className='bg-brownMain'>
										<th className='py-4 px-6 text-left text-white font-semibold w-1/2'>Ilość dokumentów księgowych</th>
										<th className='py-4 px-6 text-right text-white font-semibold w-1/4'>
											Cena Ryczałt/ryczałt + VAT i JPK
										</th>
										<th className='py-4 px-6 text-right text-white font-semibold w-1/4'>Cena KPiR/KPiR + VAT i JPK</th>
									</tr>
								</thead>
								<tbody>
									{pricingData.sections[0].rows?.map((row, index) => (
										<tr key={index} className={index % 2 === 0 ? 'bg-secondBg' : 'bg-mainBg'}>
											<td className='py-4 px-6 text-grayish w-1/2'>{row.documents}</td>
											<td className='py-4 px-6 text-grayish w-1/4 text-right'>{row.priceRyczalt}</td>
											{row.priceKPiR && <td className='py-4 px-6 text-grayish w-1/4 text-right'>{row.priceKPiR}</td>}
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{/* Mobile */}
						<div className='md:hidden shadow-normal'>
							{pricingData.sections[0].rows?.map((row, index) => (
								<div key={index} className={index % 2 === 0 ? 'bg-secondBg p-4' : 'bg-mainBg p-4'}>
									<div className='text-grayish mb-2 max-w-[80%]'>{row.documents}</div>
									<div className='flex justify-end items-center text-sm'>
										<div className='ml-4'>
											<span className='text-brownMain font-medium'>Ryczałt: </span>
											<span className='text-grayish'>{row.priceRyczalt}</span>
										</div>
										{row.priceKPiR && (
											<div className='ml-4'>
												<span className='text-brownMain font-medium'>KPiR: </span>
												<span className='text-grayish'>{row.priceKPiR}</span>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Kadry i płace */}
					<div className='mb-16'>
						<h3 className='text-center text-xl md:text-2xl bg-brownMain text-white md:text-brownMain md:bg-inherit font-semibold md:mb-8 p-4 w-full md:max-w-[500px] mx-auto'>
							Kadry i płace
						</h3>
						{/* Desktop */}
						<div className='hidden md:block bg-white rounded-lg shadow-normal'>
							<table className='w-full'>
								<thead>
									<tr className='bg-brownMain'>
										<th className='py-4 px-6 text-left text-white font-semibold w-3/4'>Rozliczenie</th>
										<th className='py-4 px-6 text-right text-white font-semibold w-1/4'>Cena</th>
									</tr>
								</thead>
								<tbody>
									{pricingData.sections[1].rows?.map((row, index) => (
										<tr key={index} className={index % 2 === 0 ? 'bg-secondBg' : 'bg-mainBg'}>
											<td className='py-4 px-6 text-grayish w-3/4'>{row.service}</td>
											<td className='py-4 px-6 text-grayish w-1/4 text-right'>{row.price}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{/* Mobile */}
						<div className='md:hidden shadow-normal'>
							{pricingData.sections[1].rows?.map((row, index) => (
								<div key={index} className={index % 2 === 0 ? 'bg-secondBg p-4' : 'bg-mainBg p-4'}>
									<div className='text-grayish mb-2 max-w-[80%]'>{row.service}</div>
									<div className='flex justify-end items-center text-sm'>
										<div className='ml-4'>
											<span className='text-brownMain font-medium'>Cena: </span>
											<span className='text-grayish'>{row.price}</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Pozostałe usługi */}
					<div className='mb-16'>
						<h3 className='text-center text-xl md:text-2xl bg-brownMain text-white md:text-brownMain md:bg-inherit font-semibold md:mb-8 p-4 w-full md:max-w-[500px] mx-auto'>
							Dodatkowe usługi
						</h3>
						{/* Desktop */}
						<div className='hidden md:block bg-white rounded-lg shadow-normal'>
							<table className='w-full'>
								<thead>
									<tr className='bg-brownMain'>
										<th className='py-4 px-6 text-left text-white font-semibold w-3/4'>Usługa</th>
										<th className='py-4 px-6 text-right text-white font-semibold w-1/4'>Cena</th>
									</tr>
								</thead>
								<tbody>
									{pricingData.sections[2].rows?.map((row, index) => (
										<tr key={index} className={index % 2 === 0 ? 'bg-secondBg' : 'bg-mainBg'}>
											<td className='py-4 px-6 text-grayish w-3/4'>{row.service}</td>
											<td className='py-4 px-6 text-grayish w-1/4 text-right'>{row.price}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{/* Mobile */}
						<div className='md:hidden shadow-normal'>
							{pricingData.sections[2].rows?.map((row, index) => (
								<div key={index} className={index % 2 === 0 ? 'bg-secondBg p-4' : 'bg-mainBg p-4'}>
									<div className='text-grayish mb-2 max-w-[80%]'>{row.service}</div>
									<div className='flex justify-end items-center text-sm'>
										<div className='ml-4'>
											<span className='text-brownMain font-medium'>Cena: </span>
											<span className='text-grayish'>{row.price}</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<p className='text-sm text-grayish'>
						Ceny usług waloryzowane są raz w roku 01 stycznia.
						<br />
						Cennik może ulec rozszerzeniu ze względu na powtarzalność dotychczas niewycenionych usług.
					</p>

					<div className='mt-12 text-center'>
						<p className='text-grayishSecondary mb-6'>Potrzebujesz indywidualnej wyceny? Skontaktuj się z nami!</p>
						<Link to='/#kontakt'>
							<button className='bg-brownMain text-white px-6 py-2 rounded-xs hover:bg-gold hover:text-grayish transition-all cursor-pointer duration-300'>
								Skontaktuj się
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
