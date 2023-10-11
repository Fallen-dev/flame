// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { PrismaClient } from '@prisma/client'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User
			userSession: string | null
		}
		// interface PageData {}
		// interface Platform {}
	}

	type User =
		| ({
				meta: {
					id: number
					domain: string | null
					profession: string | null
					gender: string | null
					image: string | null
					phone: string | null
				} | null
		  } & {
				id: string
				email: string
				username: string
				password: string
				name: string
				signedIn: boolean
				metaID: number | null
		  })
		| null

	interface FormInputType {
		type: string
		name: string
		placeholder: string
		autocomplete: string
		invalid?: string | undefined
		required?: boolean
	}
}

export {}
