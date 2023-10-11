<script>
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import Fly from '$lib/components/Fly.svelte'
	import Toast from '$lib/components/Toast.svelte'

	export let data
</script>

<!-- TODO: Make better use of form action -->

{#if $page.url.searchParams.has('success')}
	<Toast type="success" message="Profile updated" />
{/if}

<Fly>
	<hgroup>
		<h2>Edit your profile</h2>
		<p>
			Want to change your password or email? <a href="/profile/edit/credentials">Click here.</a>
		</p>
	</hgroup>
</Fly>

<form class="tw-mb-0" method="post" use:enhance>
	<Fly stagger="1">
		<section>
			<h6>Necesarry</h6>
			<div class="grid">
				<input
					type="text"
					name="name"
					placeholder="Name"
					aria-label="Name"
					autocomplete="name"
					value={data.user?.name}
				/>
				<input
					type="text"
					name="username"
					placeholder="Username"
					aria-label="Username"
					autocomplete="off"
					value={data.user?.username}
				/>
			</div>
		</section>
	</Fly>

	<Fly stagger="2">
		<section>
			<h6>Optional</h6>
			<div class="grid">
				<input
					type="tel"
					name="phone"
					placeholder="Phone number"
					aria-label="Phone number"
					autocomplete="tel"
					value={data.user?.meta?.phone || ''}
				/>
				<input
					type="text"
					name="domain"
					placeholder="Your website or domain"
					aria-label="Your website or domain"
					autocomplete="url"
					value={data.user?.meta?.domain || ''}
				/>
				<input
					type="text"
					name="profession"
					placeholder="Organization title"
					aria-label="Organization title"
					autocomplete="organization-title"
					value={data.user?.meta?.profession || ''}
				/>
			</div>
		</section>
	</Fly>

	<Fly stagger="3">
		<section>
			<div class="grid">
				<button type="submit" class="contrast" disabled>Work in progress</button>
				<a href="/profile" role="button" class="contrast outline">Discard changes</a>
			</div>
		</section>
	</Fly>
</form>
