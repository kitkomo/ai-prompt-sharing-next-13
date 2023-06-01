'use client'

import SkeletonLoader from '@/components/Loading/SkeletonLoader'
import PromtCard from '@/components/PromtCard'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const TagPage = () => {
	const [posts, setPosts] = useState([])
	const tag = usePathname()

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/tag/${tag.substring(1)}`)
			const data = await response.json()
			setPosts(data)
		}
		fetchPosts()
	}, [])

	return (
		<div>
			<h1 className='head_text text-left'>
				<span className='orange_gradient'>#{tag.substring(1)}</span>
			</h1>
			<div className='mt-10 prompt_layout'>
				{posts.length > 0 ? (
					<>
						{posts.map(post => (
							<PromtCard
								key={post._id}
								post={post}
							/>
						))}
					</>
				) : (
					<SkeletonLoader
						count={5}
						inline
						className='skeletonLoader'
						containerClassName='containerLoader'
					/>
				)}
			</div>
		</div>
	)
}

export default TagPage
