'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@/components/Form'

const EditPromptPage = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const promptId = searchParams.get('id')

	const [isLoading, setIsLoading] = useState(true)
	const [submitting, setSubmitting] = useState(false)
	const [post, setPost] = useState({
		prompt: '',
		tags: []
	})

	useEffect(() => {
		const getPromptDetails = async () => {
			const res = await fetch(`/api/prompt/${promptId}`)
			const data = await res.json()
			setPost({
				prompt: data.prompt,
				tags: data.tags.join(' ')
			})
			setIsLoading(false)
		}

		if (promptId) getPromptDetails()
	}, [promptId])

	const updatePrompt = async e => {
		e.preventDefault()
		setSubmitting(true)

		if (!promptId) return alert('Prompt id not found')

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					prompt: post.prompt,
					tags: post.tags
				})
			})

			if (response.ok) router.push('/')
		} catch (error) {
			console.log(error)
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<Form
			type='edit'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
			isLoading={isLoading}
		/>
	)
}

export default EditPromptPage
