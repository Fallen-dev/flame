<script>
	import Fly from '$lib/components/Fly.svelte'
	import Form from '$lib/components/Form.svelte'
	import Toast from '$lib/components/Toast.svelte'

	export let form
	export let data

	$: inputs = [
		{
			type: 'text',
			name: 'name',
			placeholder: 'Name',
			autocomplete: 'name',
			required: true,
			invalid: form?.error?.fields?.name
		},
		{
			type: 'email',
			name: 'email',
			placeholder: 'Email',
			autocomplete: 'email',
			required: true,
			invalid: form?.error?.fields?.email
		},
		{
			type: 'password',
			name: 'password',
			placeholder: 'Password',
			autocomplete: 'current-password',
			required: true,
			invalid: form?.error?.fields?.password
		}
	]
</script>

{#if form?.error}
	<Toast type="error" message={form.error.message || ''} />
{/if}

<Fly>
	{#if data.sessionID}
		<hgroup>
			<h2>You&apos;re already registered</h2>
			<h3>Are you lost?</h3>
		</hgroup>

		<div class="grid">
			<a href="/register" role="button" class="contrast">Go to home page</a>
			<a href="/profile" role="button" class="contrast outline">View your profile</a>
		</div>
	{:else}
		<h1>Sign up and join the fantastic community</h1>

		<Form action="?/signup" {inputs} btnText="sign up">
			<hgroup slot="header">
				<h1>Sign up</h1>
				<p>Already an user? <a href="/signin">Log in</a> instead.</p>
				<h6>You could use any random email</h6>
			</hgroup>
		</Form>
	{/if}
</Fly>
