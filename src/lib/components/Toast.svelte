<script lang="ts">
	import toast from 'svelte-french-toast'
	import type { ToastType } from 'svelte-french-toast'

	export let type: ToastType | string
	export let message: string
	export let duration: string | number = 3000

	//@ts-ignore
	toast[type](message, { duration: +duration })
</script>
