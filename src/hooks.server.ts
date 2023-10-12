import { prisma } from '$lib/server/prisma'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async function ({ event, resolve }) {

	const sessionID = () => event.cookies.get('sessionID')

	if (sessionID()) {
		event.locals.sessionID = sessionID()

		const user = await prisma.user.findUnique({
			where: { id: event.locals.sessionID },
			include: { meta: true }
		})

		if (user) event.locals.user = user
		else {
			event.locals.user = null
			event.locals.sessionID = undefined
		}
	}//
	else {
		event.locals.sessionID = undefined
		event.locals.user = null
	}

	sessionID()
	return resolve(event)
}
