import url from '$lib/url'
import type { PageLoad } from './$types'

export const load: PageLoad = ({ fetch }) => {
	async function getusers() {
		const res = await fetch(url + '/users?limit=100')
		const data = await res.json()

		return data.users
	}

	return {
		lazy: {
			users: getusers()
		}
	}
}
