<script lang="ts">
	import PageTitle from './PageTitle.svelte'
	import { onMount } from 'svelte'
	import { getToken } from '$lib/auth'

	let notes = $state<any[]>([])

	onMount(async () => {
		const token = await getToken()
		const res = await fetch('/api/notes', {
			headers: { Authorization: `Bearer ${token}` },
		})
		notes = await res.json()
	})
</script>

<PageTitle title="Top Page" />

<h1>Notes</h1>
<ul>
	{#each notes as note}
		<li>{note.title}: {note.content}</li>
	{/each}
</ul>
