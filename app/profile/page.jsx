'use client'

import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState, memo } from 'react'

const ProfilePage = () => {
	const router = useRouter()

	const handleEdit = useCallback(post => {
		return router.push(`/update-prompt?id=${post._id}`)
	}, [])

	const handleDelete = useCallback(async post => {
		const hasConfirmed = confirm('Are you sure you want to delete prompt?')
		if (!hasConfirmed) return

		try {
			await fetch(`/api/prompt/${post._id.toString()}`, {
				method: 'DELETE'
			})
		} catch (error) {
			console.log(error)
			alert('Something went wrong while deleting a post')
		}
	}, [])

	const { data: session } = useSession()
	const [posts, setPosts] = useState([])

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user.email}/posts`)
			const data = await response.json()
			setPosts(data)
		}

		if (session?.user.email) fetchPosts()
	}, [session, handleDelete])

	return (
		<Profile
			name='My'
			description='Welcome to your personalized profile page'
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	)
}

export default ProfilePage
