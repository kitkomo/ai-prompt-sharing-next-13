'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Navbar = () => {
	const {data: session} = useSession()
	const [providers, setProviders] = useState(null)
	const [toggleDropdown, setToggleDropdown] = useState(false)

	useEffect(() => {
		const fetchProviders = async () => {
			const response = await getProviders()
			setProviders(response)
			console.log(response)
		}
		fetchProviders()
	}, [])

	return (
		<nav className='flex-between w-full mb-16 pt-3'>
			<Link href='/' className='flex gap-2 flex-center'>
				<Image
					src='assets/images/logo.svg'
					width={30}
					height={30}
					alt='Promptopia'
					className='object-contain'
				/>
				<p className='logo_text'>Promptopia</p>
			</Link>
			{/* Mobile nav */}
			<div className='sm:flex hidden'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Link href='/create-prompt' className='black_btn'>
							Create prompt
						</Link>
						<button type='button' onClick={signOut} className='outline_btn'>
							Sign Out
						</button>
						<Link href='/profile'>
							<Image
								src={session?.user.image}
								width={37}
								height={37}
								alt='profile'
								className='rounded-full'
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map(provider => (
								<button
									type='button'
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className='black_btn'
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
			<div className='sm:hidden flex relative'>
				{session?.user ? (
					<div className='flex'>
						<Image
							src={session?.user.image}
							width={37}
							height={37}
							alt='profile'
							className='rounded-full'
							onClick={() => setToggleDropdown(prev => !prev)}
						/>
						{toggleDropdown && (
							<div className='dropdown'>
								<Link
									href='/profile'
									className='dropdown_link'
									onClick={() => setToggleDropdown(false)}
								>
									My profile
								</Link>
								<Link
									href='/create-prompt'
									className='dropdown_link'
									onClick={() => setToggleDropdown(false)}
								>
									Create prompt
								</Link>
								<button
									type='button'
									onClick={() => {
										setToggleDropdown(false)
										signOut()
									}}
									className='mt-5 w-full black_btn'
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map(provider => (
								<button
									type='button'
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className='black_btn'
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	)
}

export default Navbar
