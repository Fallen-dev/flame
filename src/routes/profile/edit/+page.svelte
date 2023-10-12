<script>
	import { enhance } from '$app/forms'
	import Fly from '$lib/components/Fly.svelte'
	import Toast from '$lib/components/Toast.svelte'

	export let data
	export let form

	let loading = false
</script>

<!-- TODO: Make better use of form action -->

{#if form?.error}
	<Toast type="error" message={form.error.message} />
{/if}

<Fly>
	<hgroup>
		<h2>Edit your profile</h2>
		<p>
			Want to change your password or email? <a href="edit/credentials">Click here.</a>
		</p>
	</hgroup>
</Fly>

<form
	class="tw-mb-0"
	method="post"
	use:enhance={() => {
		loading = true
		return async function ({ update, result }) {
			if (result.type === 'failure') await update({ reset: false })
			else await update()
			loading = false
		}
	}}
>
	<Fly stagger="1">
		<section>
			<h6>Necesarry</h6>
			<div class="grid">
				<div>
					<input
						type="text"
						name="name"
						placeholder="Name"
						aria-label="Name"
						autocomplete="name"
						value={data.user?.name || ''}
						aria-invalid={form?.error?.fields?.name && true}
					/>
					<svelte:element this={form?.error?.fields?.name && 'small'}
						>{form?.error?.fields?.name}</svelte:element
					>
				</div>
				<div>
					<input
						type="text"
						name="username"
						placeholder="Username"
						aria-label="Username"
						autocomplete="username"
						value={data.user?.username || ''}
						aria-invalid={form?.error?.fields?.username && true}
					/>
					<svelte:element this={form?.error?.fields?.username && 'small'}
						>{form?.error?.fields?.username}</svelte:element
					>
				</div>
			</div>
		</section>
	</Fly>

	<Fly stagger="2">
		<section>
			<h6>Optional</h6>
			<div class="grid">
				<div>
					<input
						type="tel"
						name="phone"
						placeholder="Phone number"
						aria-label="Phone number"
						autocomplete="tel"
						value={data.user?.meta?.phone || ''}
						aria-invalid={form?.error?.fields?.phone && true}
					/>
					<svelte:element this={form?.error?.fields?.phone && 'small'}
						>{form?.error?.fields?.phone}</svelte:element
					>
				</div>
				<div>
					<input
						type="text"
						name="domain"
						placeholder="Your website or domain"
						aria-label="Your website or domain"
						autocomplete="url"
						value={data.user?.meta?.domain || ''}
						aria-invalid={form?.error?.fields?.domain && true}
					/>
					<svelte:element this={form?.error?.fields?.domain && 'small'}
						>{form?.error?.fields?.domain}</svelte:element
					>
				</div>
				<div>
					<input
						type="text"
						name="profession"
						placeholder="Organization title"
						aria-label="Organization title"
						autocomplete="organization-title"
						value={data.user?.meta?.profession || ''}
						aria-invalid={form?.error?.fields?.profession && true}
					/>
					<svelte:element this={form?.error?.fields?.profession && 'small'}
						>{form?.error?.fields?.profession}</svelte:element
					>
				</div>
			</div>
		</section>
	</Fly>

	<Fly stagger="3">
		<fieldset>
			<legend>Gender</legend>
			<label for="male">
				<input
					type="radio"
					id="male"
					name="gender"
					value="male"
					checked={data.user?.meta?.gender == 'male' ? true : false}
				/>
				Male
			</label>
			<label for="female">
				<input
					type="radio"
					id="female"
					name="gender"
					value="female"
					checked={data.user?.meta?.gender == 'female' ? true : false}
				/>
				Female
			</label>
			<label for="none">
				<input
					type="radio"
					id="none"
					name="gender"
					checked={data.user?.meta?.gender == 'none' || '' ? true : false}
				/>
				Prefer not to specify
			</label>
		</fieldset>

		<section>
			<div class="grid">
				<button type="submit" class="contrast" aria-busy={loading} disabled={loading}>Done</button>
				<a href="/profile" role="button" class="contrast outline">Back</a>
			</div>
		</section>
	</Fly>
</form>
