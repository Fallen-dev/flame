import url from '$lib/url'
import { fail } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, data }) => {
	const session = data.sessionID

	async function getposts() {
		const res = await fetch(url + `/posts?limit=${session ? 30 : 3}`)

		if (!res.ok)
			return fail(res.status, {
				message: 'API responded error',
				reason: res.statusText,
				error: true
			})

		const data = await res.json()

		return data.posts
	}

	return {
		lazy: {
			posts: getposts()
		}
	}
}
