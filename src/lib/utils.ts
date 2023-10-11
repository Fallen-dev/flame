import { fail, type Cookies } from '@sveltejs/kit'
import { z } from 'zod'

export const error = (options: {
	message: string
	target?: string
	fields?: any
	tip?: string
	status?: number
}) => fail(options.status || 400, { error: { ...options } })

export function validate(data: object) {
	const schema = z.object({
		name: z
			.string()
			.trim()
			.min(2, { message: 'Must 2 or more characters' })
			.max(64, { message: 'Must be within 64 characters' })
			.optional(),
		//
		username: z
			.string()
			.trim()
			.toLowerCase()
			.min(6, { message: 'Must be 6 or more characters' })
			.max(64, { message: 'Must be within 64 characters' })
			.regex(/~|!|@|#|\$|%|\^|\&|\*|\,|\?|\s/gi, {
				message: 'Cannot include spaces or special characters except . and _'
			})
			.optional(),
		//
		email: z.string().email({ message: 'Invalid email address' }),
		//
		password: z
			.string()
			.trim()
			.min(6, { message: 'Must be 6 or more characters' })
			.max(64, { message: 'Must be within 64 characters' })
			.optional(),
		//
		domain: z.string().url({ message: 'Invalid url format' }).optional()
	})

	const validation = schema.safeParse(data)

	if (!validation.success) {
		const errors = validation.error.flatten().fieldErrors

		function format(errorObject: any) {
			const flattenedErrors = {} as any

			for (const key in errorObject) {
				if (errorObject.hasOwnProperty(key) && errorObject[key].length > 0) {
					flattenedErrors[key] = errorObject[key][0]
				}
			}
			return flattenedErrors as object
		}

		return { success: false, errors: format(errors) }
	}
	return { success: true }
}

class Auth {
	createSession(cookies: Cookies, data: string, remember?: boolean) {
		return cookies.set('user session', data, {
			path: '/',
			httpOnly: true,
			sameSite: true,
			maxAge: remember ? 60 * 60 * 24 * 365 /* 1 year */ : 60 * 10 /* 10 minutes */
		})
	}
}

export const auth = new Auth()

export function createURL(URL: string, params: object) {
	return URL + '?' + new URLSearchParams({ ...params })
}
