import mongoose, { Schema, model, models } from 'mongoose'

const PromptSchema = new Schema({
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	prompt: {
		type: String,
		required: [true, 'Prompt is required']
	},
	tags: {
		type: [String],
		required: [true, 'At least one tag is required']
	}
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt
