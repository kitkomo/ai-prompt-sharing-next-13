'use client'

import { useEffect, useState } from 'react'
import PromtCard from './PromtCard'
import SkeletonLoader from './Loading/SkeletonLoader'

const PromptCardList = ({ data, loaded }) => {
	return (
		<div className='mt-16 prompt_layout'>
			{data.length > 0 ? (
				<>
					{data.map(post => (
						<PromtCard key={post._id} post={post} />
					))}
				</>
			) : loaded ? (
				<>
					<p className='desc text-center'></p>
					<p className='desc text-center'>No such prompts</p>
					<p className='desc text-center'></p>
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
	const [loaded, setLoaded] = useState(false)

	const handleSearchChange = e => {
		e.preventDefault()
		setSearchText(e.target.value)
	}

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/prompt`)
			const data = await response.json()
			setPosts(data)
			setLoaded(true)
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
			<PromptCardList
				data={posts.filter(
					post =>
						post.tags.join(' ').toLowerCase().includes(searchText) ||
						post.creator.username.toLowerCase().includes(searchText)
				)}
				loaded={loaded}
			/>
		</section>
	)
}

export default Feed
