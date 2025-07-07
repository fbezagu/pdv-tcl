<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Champ from '$lib/Champ.svelte';
	import Bouton from '$lib/Bouton.svelte';

	let login = $state('');
	let motDePasse = $state('');
	let erreurConnexion: string | null = $state(null);

	onMount(() => {
		localStorage.removeItem('authToken');
	});

	const connecte = async () => {
		const reponse = await fetch('/login', {
			method: 'POST',
			body: JSON.stringify({ login, motDePasse })
		});
		if (reponse.status === 200) {
			const data = await reponse.json();
			localStorage.setItem('authToken', data.token);
			goto('/');
		} else {
			erreurConnexion = (await reponse.json()).message;
		}
	};
</script>

<form onsubmit={connecte}>
	<Champ libelle="Login" bind:valeur={login}></Champ>
	<Champ libelle="Mot de passe" bind:valeur={motDePasse} type="password"></Champ>
	<Bouton libelle="Se connecter"/>
	{#if erreurConnexion}
		<p class="erreur">{erreurConnexion}</p>
	{/if}
</form>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
  }

  form {
    gap: 16px;
  }

  .erreur {
    color: red;
  }
</style>
