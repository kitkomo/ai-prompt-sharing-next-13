import Prompt from '@/models/prompt'
import { connectToDb } from '@/utils/database'

export const GET = async (req, { params }) => {
	try {
		await connectToDb()
		const prompt = await Prompt.findById(params.id).populate('creator')

		if (!prompt) return new Response('Prompt not found', { status: 404 })

		return new Response(JSON.stringify(prompt), {
			status: 200
		})
	} catch (error) {
		return new Response('Failed to fetch post', {
			status: 500
		})
	}
}

export const PATCH = async (req, { params }) => {
	const { prompt, tags } = await req.json()

	try {
		await connectToDb()
		const existingPrompt = await Prompt.findById(params.id)

		if (!existingPrompt)
			return new Response('Prompt not found', { status: 404 })

		existingPrompt.prompt = prompt
		existingPrompt.tags = tags.split(' ')

		await existingPrompt.save()

		return new Response(JSON.stringify(existingPrompt), {
			status: 200
		})
	} catch (error) {
		return new Response('Failed to update post', {
			status: 500
		})
	}
}

export const DELETE = async (req, { params }) => {
	try {
		await connectToDb()
		const existingPrompt = await Prompt.findByIdAndRemove(params.id)
		return new Response('Prompt deleted successfully', {
			status: 200
		})
	} catch (error) {
		return new Response('Failed to delete post', {
			status: 500
		})
	}
}
