<script lang="ts">
	import BoutonAjout from '$lib/BoutonAjout.svelte';
	import { panierSerialise, quantiteDansPanier, videDuPanier, videPanier } from '$lib/panier.svelte';
	import type { Article } from '$lib/types';
	import { onMount, tick } from 'svelte';

	let articles: Article[] = $state([]);

	let articlesCharges = $state(false);
	let envoiEnCours = $state(false);
	let afficheSucces = $state(false);

	const enEuros = (montant: number) => {
		return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(montant);
	};

	const totalPanier = () => {
		return articles.reduce((acc: number, article: Article) => {
			return acc + (article.prix * quantiteDansPanier(article.id));

		}, 0);
	};

	const valider = async () => {
		envoiEnCours = true;
		// await new Promise((resolve) => setTimeout(resolve, 500));
		await fetch('/ventes', {
			method: 'POST',
			body: panierSerialise()
		});
		envoiEnCours = false;
		afficheSucces = true;
	};

	const vider = () => {
		videPanier();
	};

	const nouveau = () => {
		videPanier();
		afficheSucces = false;
	};

	onMount(async () => {
		let reponse = await fetch('/articles');
		articles = await reponse.json() as Article[];
		articlesCharges = true;
	});

	let articlesVendus: Article[] = $derived(articles.filter(article => {
			return quantiteDansPanier(article.id) > 0;
		}))
	;
</script>

<div class="chargement-articles" class:active={!articlesCharges}>
	<span class="chargeur"></span>
	<p>Chargement des articles…</p>
</div>
<div class="contenu-principal" class:active={articlesCharges}>
	{#each articles as article(article.id)}
		<div>
			<span>{article.nom} - {quantiteDansPanier(article.id)}</span>
			<BoutonAjout idArticle={article.id} increment={1} />
			<BoutonAjout idArticle={article.id} increment={2} />
			<BoutonAjout idArticle={article.id} increment={5} />
			<button onclick={()=>videDuPanier(article.id)}>0</button>
		</div>
	{/each}
	{#each articlesVendus as article(article.id)}
		<div>
			{article.nom} {enEuros(article.prix)} x {quantiteDansPanier(article.id)}
			= {enEuros(quantiteDansPanier(article.id) * article.prix)}
		</div>
	{/each}
	Total : {enEuros(totalPanier())}
	<button onclick={valider} disabled={envoiEnCours}>Valider</button>
	<button onclick={vider}>Vider</button>
	<div class="succes" class:afficheSucces>
		Panier envoyé
		<button onclick={nouveau}>Nouveau</button>
	</div>
</div>

<style lang="scss">
  :global {
    body {
      font-family: Lato, sans-serif;
    }
  }

  .succes {
    display: none;

    &.afficheSucces {
      display: block;
    }
  }

  .chargement-articles {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 36px;
    justify-content: center;
    height: 100vh;

    p {
      font-size: 18px;
    }

    .chargeur {

      box-sizing: border-box;
      position: relative;
      width: 48px;
      height: 48px;
      animation: spin 1s linear infinite;

      &:after, &:before {
        content: "";
        width: 24px;
        height: 24px;
        position: absolute;
        border-radius: 50%;
        background: #c76131;
        animation: spin 1s linear infinite;
        transform-origin: 0 100%;
      }

      &:before {
        transform-origin: 0 50%;
        background: #015335;
      }

    }

    &.active {
      display: flex;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .contenu-principal {
    display: none;

    &.active {
      display: block;
    }
  }

</style>
