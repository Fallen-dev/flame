<article>
	{#if $$slots.hgroup}
		<hgroup>
			<slot name="hgroup">(hgroup)</slot>
		</hgroup>
	{/if}

	<slot>(body)</slot>

	{#if $$slots.footer}
		<footer>
			<slot name="footer">(footer)</slot>
		</footer>
	{/if}
</article>
