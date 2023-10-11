import type { Actions } from '@sveltejs/kit'

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
	}
}
