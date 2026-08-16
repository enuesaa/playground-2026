<script lang="ts">
	import { onMount } from 'svelte'
	import { getToken, logout } from '$lib/auth'

	let notes = $state<any[]>([])

	onMount(async () => {
		const token = await getToken()
		const res = await fetch('/api/notes', {
			headers: { Authorization: `Bearer ${token}` },
		})
		notes = await res.json()
	})
</script>

<button onclick={logout}>ログアウト</button>

<h1>Notes</h1>
<ul>
	{#each notes as note}
		<li>{note.title}: {note.content}</li>
	{/each}
</ul>
