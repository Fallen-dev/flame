import { prisma } from '$lib/server/prisma'
import { createURL, error, validate } from '$lib/utils'
import { redirect, type Actions } from '@sveltejs/kit'

export const actions: Actions = {
	async default({ request, cookies, locals }) {
		const formData = await request.formData()

		const name = formData.get('name') as string | undefined
		const username = formData.get('username') as string | undefined
		const phone = formData.get('phone') as string | undefined
		const domain = formData.get('domain') as string | undefined
		const profession = formData.get('profession') as string | undefined
		const gender = formData.get('gender') as string | undefined

		console.log('hello');


		if (!cookies.get('sessionID') || !locals.user) return error({ message: 'You\'re not signed in' })

		console.log('hello 1');
		const isEmpty = [phone, domain, profession, gender, name, username].filter(i => typeof i !== 'undefined').length == 0

		if (isEmpty) return error({ message: 'Nothing to update' })
		console.log('hello 2');

		const result = validate({ name, username, phone, domain })

		if (result.error) return error({ message: 'Input validation error', fields: result.error })
		console.log('hello 3');

		const meta = {
			phone: phone || locals.user.meta?.phone,
			domain: domain || locals.user.meta?.domain,
			profession: profession || locals.user.meta?.profession,
			gender: gender || locals.user.meta?.gender,
		}

		console.log('hello 4');

		await prisma.user.update({
			where: { id: locals.user.id },
			data: {
				name: name || locals.user.name,
				username: username?.toLowerCase() || locals.user.username,
				meta: {
					update: { ...meta }
				}
			}
		})

		throw redirect(307, createURL('/profile', {
			m: 'Profile updated',
			t: 'success'
		}))
	}
}
