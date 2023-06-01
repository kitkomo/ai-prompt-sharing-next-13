import Prompt from '@/models/prompt'
import User from '@/models/user'
import { connectToDb } from '@/utils/database'

export const GET = async (req, { params }) => {
	try {
		await connectToDb()

		const user = await User.findOne({
			username: params.username
		})

		const id = await user._id.toString()

		const prompts = await Prompt.find({
			creator: id
		}).populate('creator')

		return new Response(JSON.stringify(prompts), {
			status: 200
		})
	} catch (error) {
		return new Response('Failed to fetch user posts', {
			status: 500
		})
	}
}
