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
					value={data.user?.meta?.proffesion || ''}
				/>
			</div>
		</section>
	</Fly>

	<Fly stagger="3">
		<section>
			<div class="grid">
				<label for="file"
					>Upload your image
					<input type="file" id="file" name="image" />
				</label>
				<fieldset>
					<legend>Gender</legend>
					<label for="male"
						><input
							type="radio"
							id="male"
							name="gender"
							value="male"
							checked={data.user?.meta?.gender == 'male'}
						/>Male</label
					>
					<label for="female"
						><input
							type="radio"
							id="female"
							name="gender"
							value="female"
							checked={data.user.meta?.gender == 'female'}
						/>Female</label
					>
					<label for="none"
						><input
							type="radio"
							id="none"
							name="gender"
							value="none"
							checked={data.user.meta?.gender == 'none'}
						/>Not to specify</label
					>
				</fieldset>
			</div>
			<div class="grid">
				<button type="submit">Done</button>
				<button type="reset" class="outline">Discard changes</button>
			</div>
		</section>
	</Fly>
</form>
