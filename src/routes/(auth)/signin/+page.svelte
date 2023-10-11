<script>
	import Fly from '$lib/components/Fly.svelte'
	import Form from '$lib/components/Form.svelte'
	import Toast from '$lib/components/Toast.svelte'

	export let form
	export let data

	$: inputs = [
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

{#if data.userSession}
	<hgroup>
		<h2>You&apos;re already signed in</h2>
		<h3>Are you lost?</h3>
	</hgroup>

	<div class="grid">
		<a href="/register" role="button" class="contrast">Go to home page</a>
		<a href="/profile" role="button" class="contrast outline">View your profile</a>
	</div>
{:else}
	{#if form?.error}
		<Toast type="error" message={form.error.message} />
	{/if}

	<Fly>
		<h1>Welcome back</h1>
	</Fly>

	{#key form?.error?.fields?.email}
		<Fly y="-250" nodelay>
			{#if form?.error?.fields?.email}
				<article>
					<hgroup>
						<h4>We Could not found any account with this email</h4>
						<h6>Don&apos;t have an account?</h6>
					</hgroup>

					<a href="/register" role="button" class="contrast">Sign up</a>
				</article>
			{/if}
		</Fly>
	{/key}

	<Fly stagger="1">
		<!-- FORM -->
		<Form action="?/signin" {inputs} btnText="Log in" feedback={form?.error ? true : false}>
			<hgroup slot="header">
				<h1>Log in</h1>
				<h6>Don&apos;t have an account? <a href="/register">Sign up.</a></h6>
			</hgroup>
		</Form>
		<!-- FORM -->
	</Fly>
{/if}
