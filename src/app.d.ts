// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { PrismaClient } from '@prisma/client'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User
			sessionID: string | undefined
		}
		// interface PageData {}
		// interface Platform {}
	}

	type User =
		{
			meta: {
				id: string;
				domain: string | null;
				profession: string | null;
				gender: string | null;
				phone: string | null;
			} | null;
		} & {
			id: string;
			email: string;
			username: string;
			password: string;
			name: string;
			signedIn: boolean;
			metaID: string | null;
		} | null

	interface FormInputType {
		type: string
		name: string
		placeholder: string
		autocomplete: string
		invalid?: string | undefined
		required?: boolean
	}
}

export { }
