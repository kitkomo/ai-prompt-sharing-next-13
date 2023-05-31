'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@/components/Form'

const CreatePromptPage = () => {
	const router = useRouter()
	const { data: session } = useSession()
	// console.log(session)
	const [submitting, setSubmitting] = useState(false)
	const [post, setPost] = useState({
		prompt: '',
		tag: ''
	})

	const createPrompt = async e => {
		e.preventDefault()
		setSubmitting(true)

		try {
			const response = await fetch('/api/prompt/new', {
				method: 'POST',
				body: JSON.stringify({
					prompt: post.prompt,
					userEmail: session?.user.email,
					tag: post.tag
				})
			})

			if (response.ok) router.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Form
			type='create'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	)
}

export default CreatePromptPage
