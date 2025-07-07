<script lang="ts">
	import Champ from '$lib/Champ.svelte';
	import Bouton from '$lib/Bouton.svelte';
	import { goto } from '$app/navigation';

	let login = $state('');
	let motDePasse = $state('');
	let confirmationMotDePasse = $state('');
	let erreurInscription: string | null = $state(null);
	let envoiEnCours = $state(false);

	const creeCompte = async () => {
		try {
			envoiEnCours = true;
			erreurInscription = null;
			const reponse = await fetch('/comptes', {
				method: 'POST',
				body: JSON.stringify({ login, motDePasse })
			});
			if (reponse.status === 200) {
				const data = await reponse.json();
				localStorage.setItem('authToken', data.token);
				goto('/');
			} else {
				erreurInscription = (await reponse.json()).message;
			}
		} finally {
			envoiEnCours = false;
		}
	};

	const motDePasseValide = $derived(motDePasse.length > 7);

	const formulaireValide = $derived.by(() => !!login && motDePasseValide && motDePasse === confirmationMotDePasse);

</script>

<form onsubmit={creeCompte}>
	<Champ libelle="Login" bind:valeur={login}></Champ>
	<Champ libelle="Mot de passe" bind:valeur={motDePasse} type="password" autocomplete="new-password"
				 sousTitre="Au moins 8 caractères"></Champ>
	<Champ libelle="Confirmation" bind:valeur={confirmationMotDePasse} type="password" autocomplete="new-password"></Champ>
	<Bouton libelle="Créer le compte" actif={formulaireValide} bind:envoiEnCours />
	{#if erreurInscription}
		<p class="erreur">{erreurInscription}</p>
	{/if}
	<div class="note">
		<h2>Bon à savoir</h2>
		L’<a href="https://cyber.gouv.fr" target="_blank">Agence Nationale de la Sécurité des Systèmes d’Information</a>
		recommande :
		<ul>
			<li>d’utiliser un mot de passe robuste (long et complexe)</li>
			<li>d’utiliser un mot de passe différent pour chaque service</li>
			<li>d’utiliser un coffre-fort de mots de passe (ex : <a
				href="https://katzei.fr/services/Bitwarden.html" target="_blank">bitwarden</a>)
			</li>
		</ul>
		<p class="source">
			<a
				href="https://cyber.gouv.fr/publications/recommandations-relatives-lauthentification-multifacteur-et-aux-mots-de-passe"
				target="_blank">source</a>
		</p>
	</div>
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

  .note {
    font-size: 12px;
    color: #555;
    border-radius: 4px;
    background: #dfe8f3;
    padding: 8px;

    ul {
      margin: 0;
    }

    h2 {
      font-size: 12px;
      margin: 0 0 4px;
      color: #3d538c;
    }

    .source {
      margin: 0;
      font-size: 12px;
    }
  }
</style>