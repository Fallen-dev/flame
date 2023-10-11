import url from '$lib/url'
import type { PageLoad } from './$types'

export const load: PageLoad = ({ fetch, params }) => {
	async function getpost() {
		const res = await fetch(`${url}/post/${params.id}`)
		const post = await res.json()

		return post
	}

	async function getcomments() {
		const res = await fetch(`${url}/post/${params.id}/comments`)
		const data = await res.json()

		return data.comments
	}

	return {
		lazy: {
			post: getpost(),
			comments: getcomments()
		}
	}
}
