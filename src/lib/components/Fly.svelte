<script lang="ts">
	import { fly } from 'svelte/transition'

	export let duration: string | number = 350
	export let y: string | number = 200
	export let x: string | number = 0
	export let nodelay = false
	export let opacity: string | number = 0
	export let stagger: string | number = 0
</script>

<div
	in:fly={{
		delay: nodelay ? 0 : +duration + 150 * +stagger,
		duration: +duration,
		y: +y,
		x: +x,
		opacity: +opacity
	}}
	out:fly={{ duration: +duration, y: +y, x: +x, opacity: +opacity }}
	class={$$restProps.class}
>
	<slot />
</div>
