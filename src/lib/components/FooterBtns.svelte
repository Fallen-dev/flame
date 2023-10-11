<script lang="ts">
	import { fly, scale } from 'svelte/transition'

	export let reactions: string
	export let id: string
	export let dontNeedCTABtn: boolean = false

	export function bounce1(t: number) {
		const s = 2.70158 * 1.845
		if ((t *= 2) < 1) return 0.6 * (t * t * ((s + 1) * t - s))
		return 0.6 * ((t -= 2) * t * ((s + 1) * t + s) + 2)
	}
	export function bounce(t: number) {
		const s = 1.70158 * 1.525
		if ((t *= 2) < 1) return 0.578 * (t * t * ((s + 1) * t - s))
		return 0.578 * ((t -= 2) * t * ((s + 1) * t + s) + 2)
	}

	let checked = false
	let duration = 350
</script>

<footer class="tw-py-2">
	<nav>
		<ul>
			<li>
				<label
					for="checkbox-{id}"
					class="tw-flex tw-gap-1 tw-cursor-pointer"
					style:color="var(--{checked ? 'primary' : 'color'})"
				>
					<input type="checkbox" id="checkbox-{id}" class="tw-hidden" aria-hidden bind:checked />

					<div class="tw-h-6 tw-w-6">
						{#if checked}
							<div
								in:scale={{ delay: duration, duration, start: 1.5, easing: bounce }}
								out:fly={{ duration, x: 8, y: 0, easing: bounce1 }}
							>
								<iconify-icon icon="iconamoon:heart-fill" width="24" />
							</div>
						{:else}
							<div
								in:fly={{ delay: duration, duration, x: -8, y: 0, easing: bounce1 }}
								out:scale={{ duration, start: 1.5, easing: bounce }}
							>
								<iconify-icon icon="iconamoon:heart" width="24" />
							</div>
						{/if}
					</div>

					<span class="tw-mt-[1px]">
						{reactions}
					</span>
				</label>
			</li>
		</ul>

		{#if !dontNeedCTABtn}
			<ul>
				<li>
					<a href="/post/{id}" role="button">View post</a>
				</li>
			</ul>
		{/if}
	</nav>
</footer>
