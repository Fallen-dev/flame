<script>
	import Fly from '$lib/components/Fly.svelte'
	import UserDetails from '$lib/components/UserDetails.svelte'
	export let data
</script>

<Fly>
	<h2>All Flame users</h2>
	<details>
		<!-- svelte-ignore a11y-no-redundant-roles -->
		<summary role="button" class="outline">Important note</summary>
		<p>
			These are not actual users. These data are generated from <a
				href="http://dummyjson.com"
				target="_blank"
				rel="noopener noreferrer">DummyJSON API.</a
			>
		</p>
	</details>
</Fly>

<Fly stagger="1">
	{#await data.lazy.users}
		<article aria-busy="true">Loading...</article>
	{:then users}
		{#if users}
			{#each users as user (user.id)}
				<article>
					<UserDetails {user} />

					<footer>
						<a href="/users/{user.id}" role="button">View {user.firstName}&apos;s profile</a>
					</footer>
				</article>
			{/each}
			<!---->
		{:else}
			<article>
				<h5>Could not load this page</h5>
				<p>Maybe internet issue</p>

				<footer>
					<a href="/" role="button" class="contrast tw-w-full">Go to home page</a>
				</footer>
			</article>
		{/if}
		<!---->
	{:catch error}
		<article>
			<h5>Could not load this page</h5>
			<p>Message from the server</p>

			<code>{error}</code>

			<footer>
				<button class="contrast">Refresh this page</button>
			</footer>
		</article>
	{/await}
</Fly>
