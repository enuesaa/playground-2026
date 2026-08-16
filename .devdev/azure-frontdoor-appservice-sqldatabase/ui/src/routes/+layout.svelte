<script lang="ts">
	import './app.css'
	import Header from './Header.svelte'
	import { onMount } from 'svelte'
	import { ensureInit, getActiveAccount, login } from '$lib/auth'

	let ready = $state(false)

	onMount(async () => {
		await ensureInit()
		if (!getActiveAccount()) {
			await login()
			return
		}
		ready = true
	})
</script>

<svelte:head>
	<title>my-svelte-template</title>
</svelte:head>

<Header />

<main class="container mx-auto">
	{#if ready}
		<slot />
	{/if}
</main>
