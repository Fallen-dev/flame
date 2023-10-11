import { prisma } from '$lib/server/prisma'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async function ({ event, resolve }) {
	const sessionID = event.cookies.get('user session')

	if (sessionID) {
		event.locals.userSession = sessionID

		const user = await prisma.user.findUnique({
			where: { id: sessionID },
			include: { meta: true }
		})

		if (!user) {
			event.locals.userSession = null
		}
		event.locals.user = user
	} //
	else {
		event.locals.userSession = null
		event.locals.user = null
	}

	return await resolve(event)
}
