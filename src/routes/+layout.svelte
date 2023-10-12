<script lang="ts">
	import { Toaster } from 'svelte-french-toast'

	import '@fontsource/calistoga'
	import '@picocss/pico'
	import '../tailwind.postcss'
	import '../app.css'
	import { page } from '$app/stores'

	export let data
	let online = true
</script>

<svelte:head>
	<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@900&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&family=Noto+Serif+JP:wght@600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<svelte:window bind:online />

<Toaster />

<nav class="container-fluid tw-sticky tw-top-0 tw-z-[1] tw-bg-[var(--background-color)]">
	<ul>
		<li>
			<a href="/" class="contrast brand">
				<span class="logo">火</span>&nbsp;&nbsp;Flame
			</a>
		</li>
	</ul>
	<ul>
		{#if data.sessionID}
			<li><a href="/users" class="contrast">Users</a></li>
			<li><a href="/profile" class="contrast">Profile</a></li>
		{:else}
			<li><a href="/signin" class="contrast">Log in</a></li>
			<li><a href="/register" role="button">Sign up</a></li>
		{/if}
	</ul>
</nav>

{#if !online}
	<section class="container">
		<article>
			<hgroup>
				<h4>No internet connection</h4>
				<p>Waiting for reconnect...</p>
				<progress />
			</hgroup>
		</article>
	</section>
{:else}
	{#if !$page.url.pathname.match(/register|signin|users/i) && !data.sessionID}
		<section class="container md:tw-sticky md:tw-top-20">
			<hgroup>
				<h2>Sign up now</h2>
				<p>Create an account to join the amazing Flame community and explore the world</p>
			</hgroup>

			<div class="grid">
				<a href="/register" role="button">Sign up</a>
				<a href="/signin" role="button" class="contrast outline">Log in</a>
			</div>
		</section>
	{/if}
	<!-- This p just to give a space -->
	<main class="container">
		<p aria-hidden />
		<slot />
		<p aria-hidden />
	</main>
{/if}

<style>
	.brand:not(.logo) {
		font-family: 'Calistoga', cursive;
		font-display: swap;
		font-weight: 600;
	}
	.logo {
		font-family: 'Noto Serif JP', serif;
		color: var(--primary);
	}
</style>
