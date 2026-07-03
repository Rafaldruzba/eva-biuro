import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png'

const Footer = () => {
	// Funkcja do przewijania na górę
	const scrollToTop = path => {
		if (location.pathname === path) {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		} else {
			navigate(path)
		}
	}

	return (
		<footer className='bg-mainBg'>
			<div className='wrapper px-4 py-12'>
				<div className='grid md:grid-cols-4 gap-8'>
					<div>
						<Link to='/' className='block mb-4'>
							<img src={Logo} alt='Biuro Rachunkowe' className='h-12' />
						</Link>
						<p className='text-sm text-grayish'>Ewa Reluga</p>
						<p className='text-sm text-grayish'>NIP: 9471946862</p>
					</div>

					<div>
						<h3 className='text-lg font-semibold text-brownMain mb-4'>Menu</h3>
						<ul className='space-y-2'>
							<li>
								<Link to='/#' className='text-grayish hover:text-brownMain transition-colors cursor-pointer'>
									<button onClick={() => scrollToTop('/')} className='cursor-pointer'>
										Strona główna
									</button>
								</Link>
							</li>
							<li>
								<Link to='/#o-mnie' className='text-grayish hover:text-brownMain transition-colors'>
									O nas
								</Link>
							</li>
							<li>
								<Link to='/uslugi' className='text-grayish hover:text-brownMain transition-colors'>
									Usługi
								</Link>
							</li>
							<li>
								<Link to='/cennik' className='text-grayish hover:text-brownMain transition-colors'>
									Cennik
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-lg font-semibold text-brownMain mb-4'>Kontakt</h3>
						<ul className='space-y-2'>
							<li className='text-grayish'>
								<a href='https://maps.app.goo.gl/fs5VwnZQwv7U1hQ26' target='_blank' rel='noopener noreferrer'>
									Ul. Laskowa 19, Grójec 05-600
								</a>
							</li>
							<li className='text-grayish'>
								<a href='tel:+48884 905 771'>+48 884 905 771</a>
							</li>
							<li className='text-grayish'>
								<a href='mailto:br-online@br-online.pl'>br-online@br-online.pl</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-lg font-semibold text-brownMain mb-4'>Dokumenty</h3>
						<ul className='space-y-2'>
							<li className='flex flex-col space-y-2'>
								<Link to='/polityka-prywatnosci' className='text-grayish hover:text-brownMain transition-colors'>
									Polityka prywatności
								</Link>
								<Link to='/cennik' className='text-grayish hover:text-brownMain transition-colors'>
									Cennik usług
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className='mt-12 pt-8 border-t border-stone-300'>
					<div className='flex flex-col md:flex-row justify-between items-center'>
						<p className='text-sm text-grayish'>
							© {new Date().getFullYear()} Biuro Rachunkowe. Wszelkie prawa zastrzeżone.
						</p>
						<p className='text-sm text-grayish mt-4 md:mt-0'>
							Strona wykonana przez{' '}
							<a href='https://emarika.pl' target='_blank' className='text-brownMain font-semibold hover:underline'>
								emarika.pl
							</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
