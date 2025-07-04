<script lang="ts">
	import {
		modePaiement,
		panierSerialise,
		quantiteDansPanier,
		videDuPanier,
		videPanier
	} from '$lib/panier.svelte';
	import type { Article } from '$lib/types';
	import { onMount } from 'svelte';
	import Chargeur from '$lib/Chargeur.svelte';
	import ModesPaiement from '$lib/ModesPaiement.svelte';
	import TuileArticle from '$lib/TuileArticle.svelte';
	import { chargeArticles } from '$lib/articles';
	import Toast from '$lib/Toast.svelte';

	let articles: Article[] = $state([]);

	let articlesCharges = $state(false);
	let envoiEnCours = $state(false);
	let toastSucces: Toast;

	const enEuros = (montant: number) => {
		return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(montant);
	};

	const totalPanier = () => {
		return articles.reduce((acc: number, article: Article) => {
			return acc + article.prix * quantiteDansPanier(article.id);
		}, 0);
	};

	const valider = async () => {
		envoiEnCours = true;
		await fetch('/ventes', { method: 'POST', body: panierSerialise() });
		envoiEnCours = false;
		toastSucces.affiche();
		videPanier();
	};

	const vider = () => {
		videPanier();
	};

	onMount(async () => {
		articles = await chargeArticles();
		articlesCharges = true;
	});

	let nonValide = $derived(!modePaiement.courant);

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

<div class="chargement-articles" class:active={!articlesCharges}>
	<Chargeur />
	<p>Chargement des articles…</p>
</div>

<div class="conteneur">
	<main class:active={articlesCharges}>
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

	<footer class:active={articlesCharges}>
		<button class="vider" onclick={vider} aria-label="Vider le panier" title="Vider le panier"
			><span class="icone"></span></button
		>
		<button class="valider" onclick={valider} disabled={envoiEnCours || nonValide}>
			Envoyer
			{#if totalPanier() > 0}
				({enEuros(totalPanier())})
			{/if}
			{#if envoiEnCours}
				<span class="svg-spinners--gooey-balls-2"></span>
				{/if}
		</button>
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
		main {
			display: none;
			padding: 16px;

			&.active {
				display: block;
			}
		}

		section {
			width: 100%;
		}

		footer {
			display: none;
			flex-direction: column;
			padding: 0 16px 32px;

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

			.valider {
				display: flex;
				gap: 16px;
				justify-content: center;
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

	.articles {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(156px, 1fr));
		gap: 16px;
	}

  .svg-spinners--gooey-balls-2 {
    display: inline-block;
    width: 24px;
    height: 24px;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cdefs%3E%3Cfilter id='svgSpinnersGooeyBalls20'%3E%3CfeGaussianBlur in='SourceGraphic' result='y' stdDeviation='1'/%3E%3CfeColorMatrix in='y' result='z' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7'/%3E%3CfeBlend in='SourceGraphic' in2='z'/%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23svgSpinnersGooeyBalls20)'%3E%3Ccircle cx='5' cy='12' r='4' fill='%23000'%3E%3Canimate attributeName='cx' calcMode='spline' dur='2s' keySplines='.36,.62,.43,.99;.79,0,.58,.57' repeatCount='indefinite' values='5;8;5'/%3E%3C/circle%3E%3Ccircle cx='19' cy='12' r='4' fill='%23000'%3E%3Canimate attributeName='cx' calcMode='spline' dur='2s' keySplines='.36,.62,.43,.99;.79,0,.58,.57' repeatCount='indefinite' values='19;16;19'/%3E%3C/circle%3E%3CanimateTransform attributeName='transform' dur='0.75s' repeatCount='indefinite' type='rotate' values='0 12 12;360 12 12'/%3E%3C/g%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }
</style>
