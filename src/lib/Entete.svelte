<script lang="ts">
	import { goto } from '$app/navigation';
	import Lien from '$lib/Lien.svelte';
	import Icone from '$lib/Icone.svelte';
	import { onMount } from 'svelte';

	const { courant } = $props();

	let idUtilisateur: string | null = $state(null);

	onMount(async () => {
		const token = localStorage.getItem('authToken');
		if (!token) {
			goto('/login');
			return;
		}
		const reponse = await fetch('/moi', { headers: { Authorization: `Bearer ${token}` } });
		if (reponse.status === 401) {
			goto('/login');
			return;
		}
		const infos = await reponse.json();
		idUtilisateur = infos.id;
	});

	const logout = () => {
		goto('/login');
	};
</script>
<header>
	{#if courant !== "panier"}
		<Lien href="/" apparence="bouton" variante="secondaire" taille="sm" icone="panier">
			Panier
		</Lien>
	{/if}
	{#if courant !== "historique"}
		<Lien href="/historique" apparence="bouton" variante="secondaire" taille="sm" icone="horloge">
			Historique
		</Lien>
	{/if}
	<div class="utilisateur">
		<Icone icone="utilisateur" taille="md" />
		<span>{idUtilisateur}</span>
		<button class="deconnexion" onclick={logout} title="Se déconnecter">
			<Icone icone="deconnexion" taille="md" />
		</button>
	</div>
</header>

<style lang="scss">
  header {
    position: sticky;
    top: 0;
    height: 24px;
    background: white;
    z-index: 50;
    box-shadow: 0 3px 22px -10px #919191;
    display: flex;
    padding: 8px;
    align-items: center;
    gap: 8px;

    .utilisateur {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: flex-end;
    }

    span {
      height: fit-content;
    }

    .deconnexion {
      background: transparent;
      cursor: pointer;
      border: none;
      padding: 0;
    }
  }
</style>