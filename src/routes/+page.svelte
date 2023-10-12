<script lang="ts">
	import { page } from '$app/stores'
	import Fly from '$lib/components/Fly.svelte'
	import FooterBtns from '$lib/components/FooterBtns.svelte'
	import HashTags from '$lib/components/HashTags.svelte'
	import Header from '$lib/components/Header.svelte'
	import Toast from '$lib/components/Toast.svelte'
	export let data
</script>

{#if $page.url.searchParams.has('m')}
	<Toast
		type={$page.url.searchParams.get('t') || 'blank'}
		message={$page.url.searchParams.get('m') || ''}
	/>
{/if}

<Fly>
	<h3>Posts</h3>
	{#await data.lazy.posts}
		<article aria-busy="true">Loading posts...</article>
		<!---->
	{:then posts}
		{#each posts as post}
			<article>
				<Header title={post.title} body={post.body} id={post.id} trimText />

				<HashTags tags={post.tags} />

				<FooterBtns id={post.id} reactions={post.reactions} />
			</article>
		{/each}
		<!---->
		{#if !data.sessionID}
			<article>
				<h4>That&apos;s it&excl; Create an account for more</h4>
				<p>
					Sign up or log in to see more amazing posts and explore the users of the Flame community.
				</p>

				<div class="grid">
					<a href="/register" role="button" class="contrast">Sign up</a>
					<a href="/signin" role="button" class="contrast outline">Log in</a>
				</div>
			</article>
		{/if}
		<!---->
	{:catch error}
		<article>
			<h4>Could not load the post at the moment</h4>
			<p>Message from the server</p>

			<code>{error}</code>

			<button class="contrast" on:click|once={() => location.reload()}>Refresh this page</button>
		</article>
	{/await}
</Fly>
