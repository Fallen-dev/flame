import { prisma } from '$lib/server/prisma'
import { error } from '$lib/utils'
import type { Actions } from './$types'

export const actions: Actions = {
	async signout({ cookies, locals }) {
		cookies.delete('user session')

		await prisma.user.update({
			where: { id: locals.user?.id },
			data: { signedIn: false }
		})
		locals.userSession = null

		return {
			success: true,
			message: 'You have been signed out'
		}
	},

	async deletion({ cookies, locals }) {
		cookies.delete('user session')

		await prisma.user.delete({
			where: { id: locals.user?.id }
		})

		locals.user = null
		locals.userSession = null

		return {
			success: true,
			message: 'Your account have been deleted succesfully'
		}
	},

	async updateProfile({ locals, request }) {
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

		const user = await prisma.user.update({
			where: { id: locals.user.id },
			data: {
				meta: {
					create: { ...meta }
				}
			}
		})

		console.log(user)
	}
}
