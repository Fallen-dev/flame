<script lang="ts">
	import { enhance } from '$app/forms'

	export let inputs: Array<FormInputType>
	export let action: string
	export let onlyForm = false
	export let btnText: string
	export let feedback: boolean

	$: loading = feedback ? false : false
</script>

{#if onlyForm}
	<slot name="header" />

	<form method="post" {action} use:enhance on:submit={() => (loading = true)}>
		{#each inputs as input}
			<input
				type={input.type}
				name={input.name}
				placeholder={input.placeholder}
				aria-label={input.placeholder}
				autocomplete={input.autocomplete}
				aria-invalid={input.invalid ? 'true' : 'grammar'}
				required={input.required}
			/>
			<svelte:element this={input.invalid && 'small'}>
				{input.invalid}
			</svelte:element>
		{/each}
		<!---->
		<slot name="lower">
			<fieldset>
				<label for="remember">
					<input type="checkbox" role="switch" id="remember" name="remember" />
					Remember me
				</label>
				<hgroup>
					<h6>
						<small>If not then your session will be expired after 10 minutes</small>
					</h6>
				</hgroup>
			</fieldset>
		</slot>
		<!---->
		<button type="submit" aria-busy={loading} disabled={loading}>{btnText}</button>
	</form>
{:else}
	<article class="grid" id="form">
		<div>
			<slot name="header" />
			<!---->
			<form method="post" {action} use:enhance on:submit={() => (loading = true)}>
				{#each inputs as input (input.type)}
					<input
						type={input.type}
						name={input.name}
						placeholder={input.placeholder}
						aria-label={input.placeholder}
						autocomplete={input.autocomplete}
						aria-invalid={input.invalid ? 'true' : 'grammar'}
						required
					/>
					<svelte:element this={input.invalid && 'small'}>
						{input.invalid}
					</svelte:element>
				{/each}
				<!---->
				<slot name="lower">
					<fieldset>
						<label for="remember">
							<input type="checkbox" role="switch" id="remember" name="remember" />
							Remember me
						</label>
						<hgroup>
							<h6>
								<small>If not then your session will be expired after 10 minutes</small>
							</h6>
						</hgroup>
					</fieldset>
				</slot>
				<!---->
				<button type="submit" aria-busy={loading} disabled={loading}>{btnText}</button>
			</form>
		</div>

		<div class="hero-image" />
	</article>
{/if}

<style>
	article {
		padding: 0;
		overflow: hidden;
	}

	#form {
		grid-column-gap: 0px;
	}

	article div {
		padding: 1rem;
	}

	@media (min-width: 576px) {
		article div {
			padding: 1.25rem;
		}
	}

	@media (min-width: 768px) {
		article div {
			padding: 1.5rem;
		}
	}

	@media (min-width: 992px) {
		article div {
			padding: 1.75rem;
		}
	}

	@media (min-width: 1200px) {
		article div {
			padding: 2rem;
		}
	}

	/* Hero Image */
	article .hero-image {
		display: none;
		background-color: #374956;
		background-image: url('https://images.unsplash.com/photo-1611343693811-2c235c683f26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1529&q=80');
		background-position: center;
		background-size: cover;
	}

	@media (min-width: 992px) {
		article .hero-image {
			display: block;
		}
	}
</style>
