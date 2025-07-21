<script lang="ts">
	import {
		estPanierVide,
		modePaiement,
		panierSerialise,
		quantiteDansPanier,
		videDuPanier,
		videPanier
	} from '$lib/panier.svelte';
	import type { Article } from '$lib/types';
	import { onMount } from 'svelte';
	import ModesPaiement from '$lib/ModesPaiement.svelte';
	import TuileArticle from '$lib/TuileArticle.svelte';
	import Toast from '$lib/Toast.svelte';
	import { enEuros } from '$lib/monnaie';
	import { goto } from '$app/navigation';
	import Bouton from '$lib/Bouton.svelte';
	import Chargement from '$lib/Chargement.svelte';
	import { chargeArticles } from '$lib/servicesBack';
	import Entete from '$lib/Entete.svelte';
	import Icone from '$lib/Icone.svelte';

	let articles: Article[] = $state([]);

	let articlesCharges = $state(false);
	let envoiEnCours = $state(false);
	let toastSucces: Toast;

	const totalPanier = () => {
		return articles.reduce((acc: number, article: Article) => {
			return acc + article.prix * quantiteDansPanier(article.id);
		}, 0);
	};

	const valider = async () => {
		try {
			envoiEnCours = true;
			const token = localStorage.getItem('authToken');
			if (!token) {
				goto('/login');
				return;
			}
			let reponse = await fetch('/ventes', {
				method: 'POST',
				body: panierSerialise(),
				headers: { Authorization: `Bearer ${token}` }
			});
			if (reponse.status === 200) {
				toastSucces.affiche();
				videPanier();
			} else if (reponse.status === 401) {
				goto('/login');
			}
		} finally {
			envoiEnCours = false;
		}
	};

	const vider = () => {
		videPanier();
	};

	onMount(async () => {
		articles = await chargeArticles();
		articlesCharges = true;
	});

	let pasVide = $derived(!estPanierVide());

	let valide = $derived(!!modePaiement.courant && pasVide);

	const articlesAutorises = $derived.by(() => {
		const mode = modePaiement.courant;
		return !mode ? articles : articles.filter((a) => a.modesPaiementAutorises.includes(mode));
	});

	$effect(() => {
		const mode = modePaiement.courant;
		if (!mode) return;
		articles
			.filter((a) => !a.modesPaiementAutorises.includes(mode))
			.forEach((a) => videDuPanier(a.id));
	});
</script>

<Chargement active={!articlesCharges} message="Chargement des articles…"></Chargement>

<div class="conteneur" class:active={articlesCharges}>
	<Entete courant="panier"/>
	<main>
		<Toast
			titre="Panier envoyé"
			description="Le panier a été correctement envoyé. Un nouveau panier est prêt. "
			bind:this={toastSucces}
		/>
		<section>
			<ModesPaiement />
		</section>
		<section class="actions">
			<Bouton bind:envoiEnCours bind:actif={valide} onclick={valider} id="envoyer">
				Envoyer
				{#if totalPanier() > 0}
					({enEuros(totalPanier())})
				{/if}
			</Bouton>
			<Bouton onclick={vider} title="Vider le panier" variante="danger" bind:actif={pasVide}>
				<Icone icone="poubelle" taille="md" />
			</Bouton>
		</section>
		<section class="articles">
			{#each articlesAutorises as article (article.id)}
				<TuileArticle {article} />
			{/each}
		</section>
	</main>
</div>

<style lang="scss">
  :global {
    body {
      font-family: Lato, sans-serif;
      font-size: 16px;
      color: #222;
      padding: 0;
      margin: 0;
    }
  }

  .conteneur {
    display: none;

    &.active {
      display: block;
    }

    main {
      padding: 16px;
			display: flex;
			flex-direction: column;
			gap: 16px;
    }

    section {
      width: 100%;
    }

    .actions {
      display: flex;
      flex-direction: row;
			gap: 8px;
			width: 100%;

			:global(#envoyer){
				flex: 1;
			}
    }
  }

  .articles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(156px, 1fr));
    gap: 16px;
  }
</style>
