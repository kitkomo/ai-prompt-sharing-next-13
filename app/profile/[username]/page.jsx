'use client'

import Profile from '@/components/Profile'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProfilePage = () => {
	const [posts, setPosts] = useState([])
	const pathName = usePathname()
	const username = pathName.replace('/profile/', '')

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/profile/${username}`)
			const data = await response.json()
			setPosts(data)
		}

		fetchPosts()
	}, [])

	return (
		<Profile
			name={username}
			description={`Welcome to ${username} profile page`}
			data={posts}
		/>
	)
}

export default ProfilePage
