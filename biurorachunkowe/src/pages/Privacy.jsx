const Privacy = () => {
	return (
		<div className='pt-48 pb-32 bg-secondBg'>
			<div className='wrapper px-4'>
				<h1 className='text-4xl font-semibold text-brownMain text-center mb-12'>Polityka Prywatności</h1>

				<div className='max-w-4xl mx-auto text-gray-800 space-y-8'>
					<section>
						<div className='overflow-x-auto mb-8'>
							<table className='w-full border-collapse shadow-normal'>
								<tbody>
									<tr className='border border-gray-200'>
										<td className='py-2 px-4 text-center font-medium bg-gray-100 w-1/2'>Data wprowadzenia:</td>
										<td className='py-2 px-4 text-center w-1/2 bg-mainBg'>02/01/2025r.</td>
									</tr>
									<tr className='border border-gray-200'>
										<td className='py-2 px-4 text-center font-medium bg-gray-100'>Daty aktualizacji:</td>
										<td className='py-2 px-4 text-center bg-mainBg'>02/01/2025r.</td>
									</tr>
									<tr className='border border-gray-200'>
										<td className='py-2 px-4 text-center font-medium bg-gray-100'>Zatwierdził:</td>
										<td className='py-2 px-4 text-center bg-mainBg'>EWA RELUGA</td>
									</tr>
								</tbody>
							</table>
						</div>

						<p className='mb-6 text-gray-700'>
							W trosce o ochronę Państwa danych osobowych przedstawiamy niniejszą Politykę Prywatności, która zawiera
							informacje o rodzajach, zakresie i celach przetwarzania danych osobowych w ramach prowadzonej przez nas
							działalności, w tym na naszej stronie internetowej. Informujemy również o prawach przysługujących osobom,
							których dane dotyczą.
						</p>

						<p className='mb-6 text-gray-700'>
							Dokument został opracowany zgodnie z wymogami Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679
							z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i
							w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o
							ochronie danych, RODO).
						</p>

						<div className='mt-8 text-center'>
							<a
								href='/polityka-prywatnosci-onlinebiurorachunkowe.pdf'
								target='_blank'
								rel='noopener noreferrer'
								className='inline-block py-3 px-6 bg-brownMain text-white  rounded-xs hover:bg-opacity-90 transition-all'>
								Pobierz pełną wersję Polityki Prywatności <span className='font-semibold'>(PDF)</span>
							</a>
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}

export default Privacy
