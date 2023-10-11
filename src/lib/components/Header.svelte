<script lang="ts">
	export let title: string
	export let body: string
	export let id: string
	export let trimText = false
	export let trimLength: string | number = 30
</script>

<h4>{title}</h4>

{#if trimText}
	<p>
		{body.split(' ').slice(0, +trimLength).join(' ')}
		<a href="/post/{id}">... view full post.</a>
	</p>
{:else}
	<p>{body}</p>
{/if}
