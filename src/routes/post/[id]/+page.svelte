<script>
	import Fly from '$lib/components/Fly.svelte'
	import FooterBtns from '$lib/components/FooterBtns.svelte'
	import HashTags from '$lib/components/HashTags.svelte'
	import Header from '$lib/components/Header.svelte'
	export let data
</script>

<Fly>
	{#await data.lazy.post}
		<article aria-busy="true">Loading post...</article>
	{:then post}
		{#if post}
			<section>
				<Header title={post.title} body={post.body} id={post.id} />

				<HashTags tags={post.tags} />

				<FooterBtns id={post.id} reactions={post.reactions} dontNeedCTABtn />
			</section>
		{:else}
			<article>
				<h4>This post could not be loaded</h4>
				<p>Does this port exist?</p>

				<a href="/" role="button" class="contrast tw-w-full">Go to home page</a>
			</article>
		{/if}
	{:catch error}
		<article>
			<h4>Could not load the post at the moment</h4>
			<p>Message from the server</p>

			<code>{error}</code>

			<button class="contrast" on:click|once={() => location.reload()}>Refresh this page</button>
		</article>
	{/await}
</Fly>

<Fly stagger="1">
	{#await data.lazy.comments}
		<!---->
		<h5>Comments</h5>
		<article aria-busy="true">Loading comments...</article>
		<!---->
	{:then comments}
		<!---->
		{#if !comments}
			<article>
				<h5>Could not load comments</h5>
				<p>Probably network issue.</p>

				<footer>
					<button class="contrast">Reload this page</button>
				</footer>
			</article>
			<!---->
		{:else}
			<h5>{comments.length} comment{comments.length > 1 ? 's' : ''}</h5>
			<!---->
			{#each comments as { body, user }}
				<article>
					<hgroup>
						<p><a href="/users/{user.id}">{user.username}</a> commented</p>
					</hgroup>
					<!---->
					<p>{body}</p>
				</article>
			{/each}
			<!---->
		{/if}
	{/await}
</Fly>
