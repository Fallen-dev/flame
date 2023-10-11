<script lang="ts">
	export let tags: string[]
</script>

<div class="tw-flex tw-flex-wrap tw-gap-2">
	{#each tags as tag}
		<span>
			<small class="secondary">
				#{tag}
			</small>
		</span>
	{/each}
</div>
