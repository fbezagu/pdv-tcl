<script lang="ts">
	import BoutonAjout from '$lib/BoutonAjout.svelte';
	import { modePaiement, panierSerialise, quantiteDansPanier, videDuPanier, videPanier } from '$lib/panier.svelte';
	import type { Article } from '$lib/types';
	import { onMount } from 'svelte';
	import Chargeur from '$lib/Chargeur.svelte';
	import ModesPaiement from '$lib/ModesPaiement.svelte';
	import TuileArticle from '$lib/TuileArticle.svelte';

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
		await fetch('/ventes', { method: 'POST', body: panierSerialise() });
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
		// let reponse = await fetch('/articles');
		// articles = await reponse.json() as Article[];
		articles = [
			{
				'id': 'biere',
				'nom': 'Bière',
				'prix': 2
			},
			{
				'id': 'canette',
				'nom': 'Canette / bière bouteille',
				'prix': 2
			},
			{
				'id': 'eau',
				'nom': 'Bouteille Eau 1,5L',
				'prix': 1
			},
			{
				'id': 'carte-boisson',
				'nom': 'Carte boisson (10 + 1GT)',
				'prix': 20
			},
			{
				'id': 'cafe',
				'nom': 'Café',
				'prix': 1
			},
			{
				'id': 'sandwich',
				'nom': 'Petite brasserie (frites, sandwich, panini, hotdog)',
				'prix': 3
			},
			{
				'id': 'glace',
				'nom': 'Glace',
				'prix': 2
			}
		];
		articlesCharges = true;
	});

	let articlesVendus: Article[] = $derived(articles.filter(article => {
			return quantiteDansPanier(article.id) > 0;
		}))
	;

	let nonValide = $derived(!modePaiement.courant);
</script>

<div class="chargement-articles" class:active={!articlesCharges}>
	<Chargeur />
	<p>Chargement des articles…</p>
</div>

<div class="conteneur">
	<main class:active={articlesCharges}>
		<section>
			{#each articles as article(article.id)}
				<div>
					<TuileArticle {article} />
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
			<ModesPaiement />
		</section>
		<section>
			<div class="succes" class:afficheSucces>
				Panier envoyé
				<button onclick={nouveau}>Nouveau</button>
			</div>
		</section>
	</main>

	<footer class:active={articlesCharges}>
		<button class="vider" onclick={vider} aria-label="Vider le panier" title="Vider le panier"><span
			class="icone"></span></button>
		<button class="valider" onclick={valider} disabled={envoiEnCours || nonValide}>Envoyer</button>
	</footer>
</div>


<style lang="scss">
  :global {
    body {
      font-family: Lato, sans-serif;
      font-size: 16px;
      padding: 0;
      margin: 0;
      height: 100vh;
      overflow: hidden;
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
      margin-bottom: 36px;
    }

    &.active {
      display: flex;
    }
  }

  .conteneur {
    display: flex;
    flex-direction: column;
    height: 100%;

    main {
      display: none;
      flex: 1;
      overflow: auto;
      padding: 16px;

      &.active {
        display: block;
      }
    }

    section {
      width: 100%;
      overflow: auto;
    }

    footer {
      display: none;
      flex-direction: column;

      &.active {
        display: flex;
      }

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
        position: fixed;
        bottom: 50px;

        &:hover {
          //opacity: 90%;
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

      .valider {
        display: block;
        border: none;
        background-color: #2461ae;
        color: white;
        padding: 20px;
        font-weight: bold;
        cursor: pointer;
        font-size: 18px;

        &:hover:not(&[disabled]) {
          opacity: 90%;
        }

        &[disabled] {
          background-color: #888;
          cursor: not-allowed;
        }
      }
    }
  }

</style>
