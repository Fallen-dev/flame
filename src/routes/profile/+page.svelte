<script lang="ts">
	import { enhance } from '$app/forms'
	import Fly from '$lib/components/Fly.svelte'
	import Toast from '$lib/components/Toast.svelte'

	export let form
	export let data

	$: loading = (form?.success || form?.error) && false

	let inputData = {
		profession: '',
		domain: '',
		phone: '',
		gender: ''
	}
</script>

{#if form?.success}
	<Toast type="success" message={form.message} />
{/if}

<Fly>
	{#if data.user && data.userSession}
		<section>
			<figure class="tw-w-64 tw-h-64 tw-mx-auto tw-overflow-hidden">
				<img
					src="//api.dicebear.com/7.x/avataaars/svg?seed={data.user.name.split(
						/\s/
					)[0]}&style=circle"
					alt="user's avatar"
				/>
			</figure>
			<hgroup>
				<h3 class="tw-capitalize">{data.user.name}</h3>
				<span>
					@{data.user.username}
					{#if data.user.meta?.gender}
						&bullet; {data.user.meta.gender}
					{:else if inputData.gender}
						&bullet; {inputData.gender}
					{/if}
				</span>
				{#if data.user.meta?.profession}
					<p>{data.user.meta?.profession}</p>
				{:else}
					<p>{inputData.profession}</p>
				{/if}
			</hgroup>
			<div class:headings={data.user.meta?.phone}>
				<p><b>Email: </b>{data.user.email}</p>
				{#if data.user.meta?.phone}
					<p><b>Phone: </b>{data.user.meta?.phone}</p>
				{:else if inputData.phone}
					<p><b>Phone: </b>{inputData.phone}</p>
				{/if}
				{#if data.user.meta?.domain}
					<p>
						<a
							href="//{data.user.meta?.domain}"
							target="_blank"
							rel="noopener noreferrer"
							class="contrast"
							>{data.user.meta?.domain}
						</a>
					</p>
				{:else}
					<p class="contrast tw-underline">{inputData.domain}</p>
				{/if}
			</div>
		</section>

		<!-- Complete profile -->
		{#if !data.user.meta?.domain || !data.user.meta?.gender || !data.user.meta?.phone || !data.user.meta?.profession}
			<article>
				<hgroup>
					<h4>Complete your profile</h4>
					<h6>Strongly recommended</h6>
				</hgroup>

				<!-- <p>A complete profile will help you to shine even more</p> -->

				<details class="tw-mb-0">
					<!-- svelte-ignore a11y-no-redundant-roles -->
					<summary role="button" class="contrast outline">Let&apos;s do it</summary>

					<form
						method="post"
						action="?/updateProfile"
						use:enhance
						on:submit={() => (loading = true)}
					>
						<div class="grid">
							{#if !data.user.meta?.domain}
								<input
									type="text"
									name="domain"
									placeholder="Website or portfolio url"
									aria-label="Website or portfolio url"
									autocomplete="url"
									bind:value={inputData.domain}
								/>
							{/if}
							{#if !data.user.meta?.profession}
								<input
									type="text"
									name="profession"
									placeholder="Organization title"
									aria-label="Organization title"
									autocomplete="organization-title"
									bind:value={inputData.profession}
								/>
							{/if}

							{#if !data.user.meta?.phone}
								<div>
									<input
										type="text"
										name="phone"
										placeholder="Phone no"
										aria-label="Phone no"
										autocomplete="tel"
										bind:value={inputData.phone}
									/>
									<small>You could use any random number</small>
								</div>
							{/if}
						</div>
						<fieldset>
							{#if !data?.user?.meta?.gender}
								<legend>Gender</legend>
								<label for="male">
									<input
										type="radio"
										id="male"
										name="gender"
										value="male"
										bind:group={inputData.gender}
									/>
									Male
								</label>
								<label for="female">
									<input
										type="radio"
										id="female"
										name="gender"
										value="female"
										bind:group={inputData.gender}
									/>
									Female
								</label>
								<label for="none">
									<input type="radio" id="none" name="gender" bind:group={inputData.gender} />
									Prefer not to specify
								</label>
							{/if}
						</fieldset>

						<button type="submit" class="contrast" aria-busy={loading} disabled={loading}
							>Save changes</button
						>
					</form>
				</details>
			</article>
		{/if}

		<h4>Your account</h4>
		<!-- svelte-ignore a11y-no-redundant-roles -->
		<form method="post" use:enhance>
			<a href="/profile/edit" role="button" class="contrast">Edit profile</a>

			<div class="grid">
				<details>
					<summary role="button" class="contrast outline">Sign out</summary>
					<button type="submit" class="contrast" formaction="?/signout">Confirm signing out</button>
				</details>
				<details>
					<summary role="button" class="outline" id="delete">Delete account</summary>
					<button type="submit" formaction="?/deletion" id="delete-action">Confirm deletion</button>
					<p>Thank you for being a part of the community!</p>
				</details>
			</div>
		</form>
	{/if}
</Fly>

<style>
	details {
		border-bottom: none;
		margin-bottom: 0%;
	}
	form > a {
		margin-bottom: var(--spacing);
		width: 100%;
	}
</style>
