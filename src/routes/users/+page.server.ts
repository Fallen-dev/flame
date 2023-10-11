import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { createURL } from '$lib/utils'

export const load: PageServerLoad = function ({ locals }) {
	if (!locals.userSession)
		throw redirect(
			307,
			createURL('/', {
				m: 'Sign up or log in to view users',
				t: 'error'
			})
		)
}
