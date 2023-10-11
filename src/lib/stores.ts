import { browser } from '$app/environment'
import { get, writable } from 'svelte/store'

export function createStore(name: string) {
	const store = writable(browser && JSON.parse(localStorage.getItem(name) || 'null'))

	return {
		set(value: any) {
			browser && localStorage.setItem(name, JSON.stringify(value))
			store.set(value)
		},
		subscribe: store.subscribe
	}
}

export let authAction = writable<'registered' | 'signedin' | null>()
