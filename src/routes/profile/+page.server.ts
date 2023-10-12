import { prisma } from '$lib/server/prisma'
import { error, validate } from '$lib/utils'
import type { Actions } from './$types'

export const actions: Actions = {
	async signout({ cookies, locals }) {

		if (!locals.user)
			return error({
				message: "You aren't signed in"
			})

		cookies.delete('sessionID')

		await prisma.user.update({
			where: { id: locals.user.id },
			data: { signedIn: false }
		})
		locals.sessionID = undefined

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

		cookies.delete('sessionID')

		const user = prisma.user.delete({
			where: { id: locals.user.id }
		})
		const userMeta = prisma.meta.delete({
			where: { id: locals.user.metaID || undefined }
			//* IDK why it showing metaID is number type where
			//* I have declared that as String in the schema
		})

		await prisma.$transaction([user, userMeta])

		locals.user = null
		locals.sessionID = undefined

		return {
			success: true,
			message: 'Your account have been deleted'
		}
	},

	async updateProfile({ locals, request, cookies }) {

		const formData = await request.formData()

		const phone = formData.get('phone') as string || undefined
		const domain = formData.get('domain') as string || undefined
		const profession = formData.get('profession') as string || undefined
		const gender = formData.get('gender') as string || undefined

		if (!cookies.get('sessionID') || !locals.user)
			return error({
				message: "You aren't signed in"
			})

		const isEmpty = [phone, domain, profession, gender].filter(i => typeof i !== 'undefined').length == 0

		if (isEmpty) return error({ message: 'Nothing to update' })

		const result = validate({
			domain,
			phone,
		})

		if (result.error) return error({ message: 'Input validation error', fields: result.error })

		const meta = {
			phone: phone || locals.user.meta?.phone,
			domain: domain || locals.user.meta?.domain,
			profession: profession || locals.user.meta?.profession,
			gender: gender || locals.user.meta?.gender
		}

		await prisma.user.update({
			where: { id: locals.user.id },
			data: {
				meta: {
					update: { ...meta }
				}
			}
		})

		return { success: true, message: 'Profile updated' }
	}
}
