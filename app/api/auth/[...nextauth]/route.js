import User from '@/models/user'
import { connectToDb } from '@/utils/database'
import NextAuth from 'next-auth/next'
import GoggleProvider from 'next-auth/providers/google'

const handler = NextAuth({
	providers: [
		GoggleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	callbacks: {
		async signIn({ profile }) {
			try {
				await connectToDb()

				const userExists = await User.findOne({
					email: profile.email
				})

				if (!userExists) {
					await User.create({
						email: profile.email,
						username: profile.name.replace(' ', '').toLowerCase(),
						image: profile.picture
					})
				}
				return true
			} catch (error) {
				console.log('Error checking if user exists: ', error.message)
				return false
			}
		}
	}
})

export { handler as GET, handler as POST }
