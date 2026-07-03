import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Logo from '../assets/logo.png'

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()

	// Funkcja do przewijania na górę
	const scrollToTop = path => {
		if (location.pathname === path) {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		} else {
			navigate(path)
		}
		setIsOpen(false) // Zamknij menu po kliknięciu
	}

	// Funkcja zamykająca menu
	const closeMenu = () => {
		setIsOpen(false)
	}

	return (
		<nav className='bg-secondBg py-4 shadow-normal fixed w-full z-1000'>
			<div className='wrapper px-4'>
				<div className='flex items-center justify-between'>
					<button
						onClick={() => scrollToTop('/')}
						className='flex items-center tracking-tight space-x-2 cursor-pointer'
						aria-label='Przejdź do strony głównej'>
						<img src={Logo} alt='Biuro Rachunkowe' className='h-12' />
						<div className='text-brownMain'>
							<p className='text-xl font-semibold '>Biuro rachunkowe</p>
							<p className='font-semibold text-left'>
								<span className='text-red-700'>On</span>Line <span className='font-normal'>| Ewa Reluga</span>
							</p>
						</div>
					</button>

					<div className='hidden md:flex items-center space-x-8 text-sm lg:text-base'>
						<button
							onClick={() => scrollToTop('/')}
							className='text-brownMain hover:text-brownMain transition-colors font-medium cursor-pointer hover:bg-brownMain hover:text-white transition-colors px-2 py-2'
							aria-label='Przewiń do góry strony głównej'>
							Strona główna
						</button>
						<Link
							to='/#o-mnie'
							className='text-brownMain hover:text-brownMain transition-colors font-medium hover:bg-brownMain hover:text-white transition-colors px-2 py-2'>
							O mnie
						</Link>
						<Link
							to='/uslugi'
							className='text-brownMain hover:text-brownMain transition-colors font-medium hover:bg-brownMain hover:text-white transition-colors px-2 py-2'>
							Usługi
						</Link>
						<Link
							to='/cennik'
							className='text-brownMain hover:text-brownMain transition-colors font-medium hover:bg-brownMain hover:text-white transition-colors px-2 py-2'>
							Cennik
						</Link>
						<Link to='/#kontakt'>
							<button
								className='bg-brownMain text-white px-6 py-2 rounded-xs hover:bg-gold hover:text-grayish transition-all cursor-pointer duration-300'
								aria-label='Przejdź do formularza kontaktowego'>
								Skontaktuj się
							</button>
						</Link>
						<a
							alt='telefon kontaktowy +48 884 905 771'
							href='tel:+48884905771'
							className='text-brownMain hover:text-brownMain transition-colors font-medium shadow-sm px-2 py-2 rounded-md border border-brownMain hover:bg-brownMain hover:text-white transition-colors'>
							+48 884 905 771
						</a>
					</div>

					<button
						className='md:hidden text-grayish px-2'
						onClick={() => setIsOpen(!isOpen)}
						aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
						aria-expanded={isOpen}>
						<svg
							className='w-6 h-6'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							viewBox='0 0 24 24'
							stroke='currentColor'
							aria-hidden='true'>
							{isOpen ? <path d='M6 18L18 6M6 6l12 12' /> : <path d='M4 6h16M4 12h16M4 18h16' />}
						</svg>
					</button>
				</div>

				{isOpen && (
					<div className='md:hidden mt-4 space-y-4' role='menu' aria-label='Menu mobilne'>
						<button
							onClick={() => scrollToTop('/')}
							className='block text-grayish hover:text-brownMain transition-colors'
							aria-label='Przewiń do góry strony głównej'
							role='menuitem'>
							Strona główna
						</button>
						<Link
							to='/#o-mnie'
							className='block text-grayish hover:text-brownMain transition-colors'
							onClick={closeMenu}
							role='menuitem'>
							O mnie
						</Link>
						<Link
							to='/uslugi'
							className='block text-grayish hover:text-brownMain transition-colors'
							onClick={closeMenu}
							role='menuitem'>
							Usługi
						</Link>
						<Link
							to='/cennik'
							className='block text-grayish hover:text-brownMain transition-colors'
							onClick={closeMenu}
							role='menuitem'>
							Cennik
						</Link>
						<a
							alt='telefon kontaktowy +48 884 905 771'
							href='tel:+48884905771'
							className='block text-grayish hover:text-brownMain transition-colors font-semibold'>
							+48 884 905 771
						</a>
						<Link to='/#kontakt' onClick={closeMenu} role='menuitem'>
							<button
								className='w-full bg-brownMain text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors'
								aria-label='Przejdź do formularza kontaktowego'>
								Skontaktuj się
							</button>
						</Link>
					</div>
				)}
			</div>
		</nav>
	)
}

export default Navbar
