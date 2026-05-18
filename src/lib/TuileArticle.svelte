<script lang="ts">
	import { ajouteAuPanier, quantiteDansPanier } from '$lib/panier.svelte';
	import { enEuros } from '$lib/monnaie.js';
	import 'remixicon/fonts/remixicon.css'

	const { article } = $props();
	const incremente = () => ajouteAuPanier(article.id, 1);
	const prix = $derived(quantiteDansPanier(article.id) * article.prix);
	const icone = $derived(article.icone ?? "ri-article-line")
</script>

<button class="contenu article" onclick={incremente}>
	<i class={`icone ${icone}`}></i>
	<span class="nom">{article.nom}</span>
	<span class="quantite" class:visible={prix > 0}>{quantiteDansPanier(article.id)}</span>
	<span class="prix-unitaire">{enEuros(article.prix)}</span>
	<span class="prix-total" class:visible={prix > 0}>{enEuros(prix)}</span>
</button>

<style lang="scss">
	$couleur-principale: #015335;//#2461ae;

	.icone {
		font-size: 48px;
	}

	.article {
		border: 2px solid $couleur-principale;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 10px;
		height: 156px;
		cursor: pointer;
		background: white;
		border-radius: 4px;
		position: relative;

		&:hover {
			background: #ededf5;
			box-shadow: 0 5px 10px 0 rgb(43, 43, 213, 20%);
		}

		&:active {
			background: $couleur-principale;
			color: white;
			.quantite,
			.nom,
			.icone {
				color: white;
			}

			.prix-unitaire {
				background-color: $couleur-principale;
				color: white;
			}
		}

		.prix-unitaire {
			background-color: #ddd;
			color: $couleur-principale;
			border-bottom-right-radius: 4px;
			border-top-left-radius: 2px;
			padding: 4px;
			position: absolute;
			top: 0;
			left: 0;
		}

		.prix-total {
			background-color: $couleur-principale;
			color: white;
			border-top-left-radius: 4px;
			padding: 4px;
			position: absolute;
			bottom: 0;
			right: 0;
			display: none;
			&.visible {
				display: block;
			}
		}

		.nom {
			font-size: 14px;
			color: #0d0d0d;
		}

		.quantite {
			font-size: 26px;
			color: $couleur-principale;
			visibility: hidden;
			&.visible {
				visibility: visible;
			}
		}
	}
</style>
