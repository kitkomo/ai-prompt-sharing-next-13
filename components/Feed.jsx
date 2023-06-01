'use client'

import { useEffect, useState } from 'react'
import PromtCard from './PromtCard'
import SkeletonLoader from './Loading/SkeletonLoader'

const PromptCardList = ({ data, handletagsClick }) => {
	console.log(data)
	return (
		<div className='mt-16 prompt_layout'>
			{data.length > 0 ? (
				<>
					{data.map(post => (
						<PromtCard
							key={post._id}
							post={post}
							handletagsClick={handletagsClick}
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
	)
}

const Feed = () => {
	const [searchText, setSearchText] = useState('')
	const [posts, setPosts] = useState([])

	const handleSearchChange = e => {}

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('/api/prompt')
			const data = await response.json()
			setPosts(data)
		}
		fetchPosts()
	}, [])

	return (
		<section className='feed'>
			<form className='relative w-full flex-center'>
				<input
					type='text'
					placeholder='Search for tags or username'
					value={searchText}
					onChange={handleSearchChange}
					required
					className='search_input peer'
				/>
			</form>
			<PromptCardList data={posts} handletagsClick={() => {}} />
		</section>
	)
}

export default Feed
