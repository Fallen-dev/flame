import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async function ({ locals, cookies }) {
	return { user: locals.user, sessionID: cookies.get('sessionID') }
}
