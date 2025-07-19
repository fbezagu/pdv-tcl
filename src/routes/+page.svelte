<script lang="ts">
	import { modePaiement, panierSerialise, quantiteDansPanier, videDuPanier, videPanier } from '$lib/panier.svelte';
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

	let valide = $derived(!!modePaiement.courant);

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
		<section class="articles">
			{#each articlesAutorises as article (article.id)}
				<TuileArticle {article} />
			{/each}
		</section>
	</main>

	<footer>
		<button class="vider" onclick={vider} aria-label="Vider le panier" title="Vider le panier"
		><span class="icone"></span></button
		>
		<Bouton bind:envoiEnCours bind:actif={valide} onclick={valider}>
			Envoyer
			{#if totalPanier() > 0}
				({enEuros(totalPanier())})
			{/if}
		</Bouton>
	</footer>
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
    }

    section {
      width: 100%;
    }

    footer {
      display: flex;
      flex-direction: column;
      padding: 0 16px 32px;

      .vider {
        margin: 20px;
        align-self: end;
        width: 36px;
        height: 36px;
        border-radius: 18px;
        border: none;
        background-color: #ae1e18;
        color: white;
        cursor: pointer;

        &:hover {
          background-color: #d7130b;
        }

        .icone {
          display: inline-block;
          width: 24px;
          height: 24px;
          --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z'/%3E%3C/svg%3E");
          background-color: currentColor;
          -webkit-mask-image: var(--svg);
          mask-image: var(--svg);
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
        }
      }
    }
  }

  .articles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(156px, 1fr));
    gap: 16px;
  }
</style>
