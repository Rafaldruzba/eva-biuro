import React from 'react'

export default function Button({ children }) {
	return (
		<button className='bg-gold text-grayish px-6 py-2 rounded-xs hover:bg-brownMain hover:text-white transition-colors duration-300 cursor-pointer'>
			{children}
		</button>
	)
}
