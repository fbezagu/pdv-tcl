<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		localStorage.removeItem('authToken');
	});

	const login = async () => {
		const reponse = await fetch('/login', { method: 'POST' });
		let data = await reponse.json();
		localStorage.setItem('authToken', data.token);
		goto('/');
	};
</script>

<form onsubmit={login}>
	<button>
		Login
	</button>
</form>
