import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { verify } from 'argon2'
import { prisma } from '$lib/server/prisma'
import { auth, createURL, error, validate } from '$lib/utils'

export const actions: Actions = {
	async signin({ request, cookies, locals }) {
		const formData = await request.formData()

		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const remember = formData.get('remember') === 'on' ? true : false

		const validation = validate({ email })

		if (validation.errors)
			return error({
				message: 'Invalid email address',
				fields: validation.errors
			})

		const user = await prisma.user.findUnique({
			where: { email },
			select: { id: true, password: true }
		})

		if (!user)
			return error({
				message: 'Invalid email',
				fields: { email: 'This email is not registered with any account' }
			})

		if (!(await verify(user.password, password)))
			return error({
				message: 'Incorrect password',
				fields: { password: 'This password is incorrect' }
			})

		await prisma.user.update({
			where: { email },
			data: { signedIn: true }
		})
		auth.createSession(cookies, user.id, remember)

		throw redirect(
			307,
			createURL('/', {
				m: 'Welcome back',
				t: 'success'
			})
		)
	}
}
