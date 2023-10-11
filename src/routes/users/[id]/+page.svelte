<script>
	import Fly from '$lib/components/Fly.svelte'
	import FooterBtns from '$lib/components/FooterBtns.svelte'
	import HashTags from '$lib/components/HashTags.svelte'
	import Header from '$lib/components/Header.svelte'
	import UserDetails from '$lib/components/UserDetails.svelte'
	export let data
</script>

<!-- About user -->
<Fly>
	{#await data.lazy.user}
		<article aria-busy="true">Loading user...</article>
	{:then user}
		{#if user}
			<section>
				<figure class="tw-w-64 tw-h-64 tw-mx-auto tw-overflow-hidden">
					<img
						src="//api.dicebear.com/7.x/avataaars/svg?seed={user.firstName}&style=circle"
						alt="User's avatar"
					/>
				</figure>
				<!---->
				<UserDetails {user} />
				<!---->
				<details class="tw-border-b-0">
					<!-- svelte-ignore a11y-no-redundant-roles -->
					<summary role="button" class="outline">Important note</summary>
					<p>
						These details are not of an actual user. This data is generated from <a
							href="http://dummyjson.com"
							target="_blank"
							rel="noopener noreferrer">DummyJSON API.</a
						>
					</p>
				</details>
			</section>
		{/if}
	{/await}
</Fly>

<!-- User's post -->
<Fly stagger="1">
	{#await data.lazy.posts}
		<article aria-busy="true">Loading posts...</article>
	{:then posts}
		{#if posts}
			<h3>User&apos;s post{posts.length > 1 ? 's' : ''}</h3>
			<!---->
			{#if posts.length > 0}
				{#each posts as post}
					<article>
						<Header title={post.title} body={post.body} id={post.id} trimText />

						<HashTags tags={post.tags} />

						<FooterBtns id={post.id} reactions={post.reactions} />
					</article>
				{/each}
			{:else}
				<article>
					<h4>This user haven&apos;t posted yet</h4>
					<footer>
						<div class="grid tw-gap-4">
							<a href="/users" role="button" class="contrast">See all users</a>
							<a href="/" role="button" class="contrast outline">Go to home</a>
						</div>
					</footer>
				</article>
			{/if}
			<!---->
		{:else}
			<article>
				<h5>This post could not be loaded</h5>
				<p>Does this port exist?</p>

				<footer>
					<a href="/" role="button" class="contrast tw-w-full">Go to home page</a>
				</footer>
			</article>
		{/if}
		<!---->
	{:catch error}
		<article>
			<h5>Could not load the post at the moment</h5>
			<p>Message from the server</p>

			<code>{error}</code>

			<footer>
				<button class="contrast">Refresh this page</button>
			</footer>
		</article>
	{/await}
</Fly>
