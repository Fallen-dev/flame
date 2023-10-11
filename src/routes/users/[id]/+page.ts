import url from '$lib/url'
import type { PageLoad } from './$types'

export const load: PageLoad = ({ fetch, params }) => {
	async function getuser() {
		const res = await fetch(url + '/user/' + params.id)
		return await res.json()
	}

	async function getPostsByUser() {
		const res = await fetch(`${url}/posts/user/${params.id}`)
		const data = await res.json()

		return data.posts
	}

	return {
		lazy: {
			user: getuser(),
			posts: getPostsByUser()
		}
	}
}
