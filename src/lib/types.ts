export type UserData = {
	firstName: string
	lastName: string
}

export interface User {
	id: string
	name: string
	username: string
	credentials: { email: string; password: string }
	meta?: { image?: string; phone?: string; profession?: string; domain: string }
}
