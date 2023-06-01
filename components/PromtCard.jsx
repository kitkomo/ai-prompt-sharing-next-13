'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const PromtCard = ({ post, handleEdit, handleDelete }) => {
	const { data: session } = useSession()
	const pathName = usePathname()

	const [copied, setCopied] = useState('')

	const handleCopy = () => {
		setCopied(post.prompt)
		navigator.clipboard.writeText(post.prompt)
		setTimeout(() => setCopied(''), 3000)
	}

	return (
		<div className='prompt_card'>
			<div className='flex justify-between items-start gap-5'>
				<div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
					<Link
						href={
							session?.user.email === post.creator.email
								? '/profile'
								: `/profile/${post.creator.username}`
						}
						className='flex-grow flex gap-3'
					>
						<Image
							src={post.creator.image}
							alt='user picture'
							width={40}
							height={40}
							className='rounded-full object-cover'
						/>
						<div className='flex-1 flex-col'>
							<h3 className='font-satoshi font-semibold text-gray-900'>
								{post.creator.username}
							</h3>
							<p className='font-inter text-sm text-gray-500'>
								{post.creator.email}
							</p>
						</div>
					</Link>
					<div className='copy_btn' onClick={handleCopy}>
						<Image
							src={
								copied === post.prompt
									? '/assets/icons/tick.svg'
									: '/assets/icons/copy.svg'
							}
							width={12}
							height={12}
							alt={copied === post.prompt ? 'tick_icon' : 'copy_icon'}
						/>
					</div>
				</div>
			</div>
			<p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
			<p className='font-inter text-sm blue_gradient cursor-pointer flex gap-3'>
				{post.tags.map(tag => (
					<Link href={`/${tag}`} key={tag}>
						#{tag}
					</Link>
				))}
			</p>

			{session?.user.email === post.creator.email &&
				pathName === '/profile' && (
					<div className='flex justify-center gap-4 mt-5 border-t border-gray-100 pt-3'>
						<button
							className='font-inter text-sm green_gradient cursor-pointer'
							onClick={handleEdit}
						>
							Edit
						</button>
						<button
							className='font-inter text-sm orange_gradient cursor-pointer'
							onClick={handleDelete}
						>
							Delete
						</button>
					</div>
				)}
		</div>
	)
}

export default PromtCard
