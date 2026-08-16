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

<div class="page">
	<header>
		<h1>Notes</h1>
		<button onclick={logout}>ログアウト</button>
	</header>

	<ul class="notes">
		{#each notes as note}
			<li class="note">
				<span class="title">{note.title}</span>
				<span class="content">{note.content}</span>
			</li>
		{/each}
	</ul>
</div>

<style>
	.page {
		max-width: 480px;
		margin: 2rem auto;
		padding: 0 1rem;
		font-family: system-ui, sans-serif;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	h1 {
		font-size: 1.25rem;
		margin: 0;
	}

	button {
		border: 1px solid #ddd;
		border-radius: 6px;
		padding: 0.4rem 0.8rem;
		font-size: 0.85rem;
		cursor: pointer;
	}

	button:hover {
		background: #f5f5f5;
	}

	.notes {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.note {
		border: 1px solid #eee;
		border-radius: 8px;
		padding: 0.75rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.title {
		font-weight: 600;
	}

	.content {
		color: #666;
		font-size: 0.9rem;
	}
</style>
