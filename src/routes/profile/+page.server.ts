import { prisma } from '$lib/server/prisma'
import { error } from '$lib/utils'
import type { Actions } from './$types'

export const actions: Actions = {
	async signout({ cookies, locals }) {
		
		if (!locals.user)
			return error({
				message: "You aren't signed in"
			})

		cookies.delete('user session')
		
		await prisma.user.update({
			where: { id: locals.user.id },
			data: { signedIn: false }
		})
		locals.userSession = null

		return {
			success: true,
			message: 'You have been signed out'
		}
	},

	async deletion({ cookies, locals }) {
		
		if (!locals.user)
			return error({
				message: "You aren't signed in"
			})

		cookies.delete('user session')

		const user = prisma.user.delete({
			where: { id: locals.user.id },
		})
		const userMeta = prisma.meta.delete({
			where: {id: String(locals.user.metaID)}
			//* IDK why it showing metaID is number type where
			//* I have declared that as String in the schema
		})

		await prisma.$transaction([user, userMeta])

		locals.user = null
		locals.userSession = null

		return {
			success: true,
			message: 'Your account have been deleted'
		}
	},

	async updateProfile({ locals, request }) {
		console.log('hello');
		
		const formData = await request.formData()

		const phone = formData.get('phone') as string
		const domain = formData.get('domain') as string
		const profession = formData.get('profession') as string
		const gender = formData.get('gender') as string

		if (!locals.user)
			return error({
				message: "You aren't signed in"
			})

		const meta = {
			phone: phone || locals.user.meta?.phone,
			domain: domain || locals.user.meta?.domain,
			profession: profession || locals.user.meta?.profession,
			gender: gender || locals.user.meta?.gender
		}

		console.log(meta);

		const user = await prisma.user.update({
			where: { id: locals.user.id },
			data: {
				meta: {
					update: { ...meta }
				}
			}
		})

		console.log(user);
		

		return {success: true, message: 'Profile updated'}
	}
}
