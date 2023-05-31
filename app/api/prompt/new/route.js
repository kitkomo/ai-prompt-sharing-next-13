import Prompt from '@/models/prompt'
import User from '@/models/user'
import { connectToDb } from '@/utils/database'

export const POST = async (req, res) => {
	const { userEmail, prompt, tag } = await req.json()

	try {
		await connectToDb()

		const existingUser = await User.findOne({
			email: userEmail
		})

		const userId = existingUser._id

		const newPrompt = new Prompt({
			creator: userId,
			prompt,
			tag
		})
		await newPrompt.save()

		return new Response(JSON.stringify(newPrompt), { status: 201 })
	} catch (error) {
		return new Response('Failed to create a new prompt', { status: 500 })
	}
}
