import type { Actions } from './$types'
import { redirect } from '@sveltejs/kit'
import { hash } from 'argon2'
import { auth, createURL, error, validate } from '$lib/utils'
import { prisma } from '$lib/server/prisma'
import { generateUsername } from 'unique-username-generator'

export const actions: Actions = {
	async signup({ request, cookies }) {
		const formData = await request.formData()

		const name = formData.get('name') as string
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const remember = formData.get('remember') === 'on' ? true : false

		const username = generateUsername(undefined, 3, 17)

		const result = validate({ name, email, password })

		if (result?.error)
			return error({
				message: 'Input validation error',
				fields: result.error
			})

		const isExistingUser = await prisma.user.findUnique({ where: { email } })

		if (isExistingUser)
			return error({
				message: 'Email already registered',
				fields: { email: 'This email is already registered' }
			})

		const createdUser = await prisma.user.create({
			data: {
				email,
				name,
				username,
				password: await hash(password),
				meta: { create: {} }
			}
		})

		auth.createSession(cookies, createdUser.id, remember)

		throw redirect(
			307,
			createURL('/', {
				m: 'Account created successfully',
				t: 'success'
			})
		)
	}
}
