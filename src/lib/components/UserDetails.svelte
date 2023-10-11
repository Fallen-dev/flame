<script lang="ts">
	export let user: any

	const name = user.firstName + ' ' + user.lastName
</script>

<hgroup>
	<h3>{name}</h3>
	<span>@{user.username} &bullet; {user.gender}</span>
	<p>{user.company.title}</p>
</hgroup>

<div class="headings">
	<p><b>Email:</b> {user.email}</p>
	<p><b>Phone:</b> {user.phone}</p>
	<p>
		<a href="//{user.domain}" target="_blank" rel="noopener noreferrer" class="contrast"
			>{user.domain}
		</a>
	</p>
</div>
