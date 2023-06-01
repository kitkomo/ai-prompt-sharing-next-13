import Prompt from '@/models/prompt'
import User from '@/models/user'
import { connectToDb } from '@/utils/database'

export const POST = async (req, res) => {
	const { userEmail, prompt, tags } = await req.json()

	try {
		await connectToDb()

		const {_id: userId} = await User.findOne({
			email: userEmail
		})

		const formattedTags = tags.split(' ')
		console.log(formattedTags)
		console.log(userId)
	
		const newPrompt = new Prompt({
			creator: userId,
			prompt,
			tags: formattedTags
		})
		await newPrompt.save()

		return new Response(JSON.stringify(newPrompt), { status: 201 })
	} catch (error) {
		console.log(error)
		return new Response('Failed to create a new prompt', { status: 500 })
	}
}
