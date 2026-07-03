import { useRef, useState } from 'react';

const Newsletter = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState(null); // null, 'success', 'error'
	const hiddenFormRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage('');

		if (hiddenFormRef.current) {
			// Ustawiamy wartość pola EMAIL w ukrytym formularzu
			const hiddenEmail = hiddenFormRef.current.querySelector(
				'input[name="EMAIL"]'
			);
			hiddenEmail.value = email;

			// Submit formularza do ukrytego iframe
			hiddenFormRef.current.submit();

			// Po 2 sekundach wyświetlamy komunikat sukcesu
			setTimeout(() => {
				setStatus('success');
				setMessage('Dziękujemy za zapisanie się do newslettera!');
				setEmail('');
				setLoading(false);
			}, 2000);
		}
	};

	return (
		<section className='bg-mainBg py-16'>
			<div className='wrapper px-4'>
				<div className='max-w-3xl mx-auto text-center space-y-6'>
					<h2 className='text-3xl md:text-4xl text-brownMain tracking-tight'>
						Bądź na bieżąco z{' '}
						<span className='font-semibold'>aktualnościami podatkowymi</span>
					</h2>
					<p className='text-grayish text-lg'>
						Zapisz się do naszego newslettera i otrzymuj najważniejsze
						informacje prosto na Twoją skrzynkę.
					</p>

					<form
						onSubmit={handleSubmit}
						className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'
					>
						<div className='flex-grow max-w-md'>
							<input
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='Twój adres e-mail'
								required
								className='w-full px-4 py-3 rounded-xs border border-stone-300 focus:outline-none focus:ring-2 focus:ring-gold'
							/>
						</div>
						<button
							type='submit'
							disabled={loading}
							className='bg-gold text-grayish px-6 py-3 rounded-xs hover:bg-brownMain hover:text-white transition-colors duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
						>
							{loading ? 'Zapisywanie...' : 'Zapisz się'}
						</button>
					</form>

					{message && (
						<div
							className={`mt-4 text-center ${
								status === 'success' ? 'text-green-600' : 'text-red-500'
							}`}
						>
							{message}
						</div>
					)}
				</div>
			</div>

			{/* Ukryty formularz z targetem do ukrytego iframe */}
			<form
				ref={hiddenFormRef}
				action='https://sibforms.com/serve/MUIFAM4j8fHJDUrm89QrN0zVXuzYpwDb6w1C70ubNCv7k0-mKyxv5m6dnrahg7VwdvuzCt9dazSGHqRJ1hxlZdqFUo8EhSy9giEx8GS9cJEDxr7p-NIl51AsHupnX-5l-qg7XWs0ntS2t9Jhmb1wHt4ySXFF-CwblrjLs_9NbThTXi6Yo05j6M2jqkshXg2Oy22xFu7vwoMVlRWC'
				method='POST'
				target='hidden_iframe'
				style={{ display: 'none' }}
			>
				<input type='hidden' name='EMAIL' />
				<input type='hidden' name='email_address_check' value='' />
				<input type='hidden' name='locale' value='en' />
			</form>
			<iframe name='hidden_iframe' style={{ display: 'none' }}></iframe>
		</section>
	);
};

export default Newsletter;
