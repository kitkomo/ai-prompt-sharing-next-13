import mongoose from 'mongoose'

let isConnected = false

export const connectToDb = async () => {
	mongoose.set('strictQuery', true)
	if (isConnected) {
		console.log('MongoDB is already connected')
		return
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: 'promptopia',
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		isConnected = true
		console.log('MongoDB is connected')
	} catch (error) {
		console.log('Failed to connect to DB', error)
	}
}
