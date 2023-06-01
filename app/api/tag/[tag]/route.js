import Prompt from '@/models/prompt'
import { connectToDb } from '@/utils/database'

export const GET = async (req, { params }) => {
	try {
		await connectToDb()
		const prompts = await Prompt.find({
			tags: params.tag
		}).populate('creator')

		return new Response(JSON.stringify(prompts), {
			status: 200
		})
	} catch (error) {
		return new Response(`Failed to fetch posts with such tag`, {
			status: 500
		})
	}
}
