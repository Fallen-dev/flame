import type { User } from '$types'
import { redirect, type Actions } from '@sveltejs/kit'

export const actions: Actions = {
	async default({ request, cookies }) {
		const formData = await request.formData()

		const name = formData.get('name') as string
		const username = formData.get('username') as string
		const phone = formData.get('phone') as string
		const domain = formData.get('domain') as string
		const profession = formData.get('profession') as string

		const cookieUser = cookies.get('user')

		if (!cookieUser) return

		const oldUser = JSON.parse(cookieUser) as User

		const user: User = {
			name,
			username,
			id: oldUser.id,
			credentials: oldUser.credentials,
			meta: {
				phone,
				profession,
				domain
			}
		}

		cookies.set('user', JSON.stringify(user), {
			path: '/',
			httpOnly: true,
			sameSite: true,
			maxAge: 60 * 60 * 24 * 24 * 365
		})

		throw redirect(303, '/profile?success')
	}
}
