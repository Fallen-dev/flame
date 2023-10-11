<script lang="ts">
	import { enhance } from '$app/forms'
	import Fly from '$lib/components/Fly.svelte'
	import Toast from '$lib/components/Toast.svelte'
	import Form from '$lib/components/Form.svelte'

	export let form
	export let data

	const inputs = [
		{
			type: 'tel',
			name: 'phone',
			placeholder: 'Phone number',
			autocomplete: 'tel'
		},
		{
			type: 'text',
			name: 'domain',
			placeholder: 'Website or domain',
			autocomplete: 'url'
		},
		{
			type: 'text',
			name: 'profession',
			placeholder: 'Organization title',
			autocomplete: 'off'
		}
	]

	const fields =
		data.user?.meta &&
		Object.entries(data.user.meta)
			.filter(([_, value]) => value)
			.slice(1)
			.map(([key]) =>
				inputs.splice(
					inputs.findIndex((el) => el.name === key),
					1
				)
			)
</script>

{#if form?.success}
	<Toast type="success" message={form.message} />
{/if}

<Fly>
	{#if data.user && data.userSession}
		<section>
			<hgroup>
				<h3>{data.user.name}</h3>
				<span>
					@{data.user.username}
					{#if data.user.meta?.gender}
						&nbsp;&bullet; {data.user.meta?.gender}
					{/if}
				</span>
				{#if data.user.meta?.profession}
					<p>{data.user.meta?.profession}</p>
				{/if}
			</hgroup>
			<div class:headings={data.user.meta?.phone}>
				<p><b>Email: </b>{data.user.email}</p>
				{#if data.user.meta?.phone}
					<p><b>Phone: </b>{data.user.meta?.phone}</p>
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
				{/if}
			</div>
		</section>

		<!-- Complete profile -->
		{#if fields && fields.length < 4}
			<article>
				<hgroup>
					<h4>Complete your profile</h4>
					<h6>Strongly recommended</h6>
				</hgroup>

				<p>A complete profile will help you to shine even more</p>

				<details class="tw-mb-0">
					<!-- svelte-ignore a11y-no-redundant-roles -->
					<summary role="button" class="contrast">Let&apos;s do it</summary>

					<Form action="?/updateProfile" {inputs} onlyForm>
						<fieldset slot="lower">
							{#if !data?.user?.meta?.gender}
								<legend>Gender</legend>
								<label for="male">
									<input type="radio" id="male" name="gender" value="male" />
									Male
								</label>
								<label for="female">
									<input type="radio" id="female" name="gender" value="female" />
									Female
								</label>
								<label for="none">
									<input type="radio" id="none" name="gender" value="none" />
									Prefer not to specify
								</label>
							{/if}
						</fieldset>

						<button type="submit" class="contrast" slot="actions">Done</button>
					</Form>
				</details>
			</article>
		{/if}

		<article>
			<h4>Your account</h4>
			<!-- svelte-ignore a11y-no-redundant-roles -->
			<form method="post" class="grid" use:enhance>
				<a href="/profile/edit" role="button" class="contrast">Edit profile</a>

				<details>
					<summary role="button" class="secondary">Sign out</summary>
					<button type="submit" class="contrast" formaction="?/signout">Confirm signing out</button>
				</details>

				<details>
					<summary role="button" class="secondary outline">Delete account</summary>
					<button type="submit" class="contrast" formaction="?/deletion">Confirm deletion</button>

					<p>Thank you for being a part of the community!</p>
				</details>
			</form>
		</article>
	{:else}
		<h6>You have not signed in</h6>
	{/if}
</Fly>

<style>
	details {
		border-bottom: none;
		margin-bottom: 0%;
	}
</style>
