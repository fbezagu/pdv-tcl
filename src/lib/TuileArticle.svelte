<script lang="ts">
	import { ajouteAuPanier, quantiteDansPanier } from '$lib/panier.svelte';
	import { enEuros } from '$lib/monnaie.js';

	const { article } = $props();
	const incremente = () => ajouteAuPanier(article.id, 1);
	const prix = $derived(quantiteDansPanier(article.id) * article.prix);
</script>

<button class="contenu article" onclick={incremente}>
	<span class={`icone ${article.id}`}></span>
	<span class="nom">{article.nom}</span>
	<span class="quantite" class:visible={prix > 0}>{quantiteDansPanier(article.id)}</span>
	<span class="prix-unitaire">{enEuros(article.prix)}</span>
	<span class="prix-total" class:visible={prix > 0}>{enEuros(prix)}</span>
</button>

<style lang="scss">
	$couleur-principale: #015335;//#2461ae;

	.icone {
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23000' stroke-linejoin='round' stroke-width='4'%3E%3Cpath d='M44 14L24 4L4 14v20l20 10l20-10z'/%3E%3Cpath stroke-linecap='round' d='m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19'/%3E%3C/g%3E%3C/svg%3E");
		display: inline-block;
		width: 48px;
		height: 48px;
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

	.biere {
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M352 200v240a40.12 40.12 0 0 1-40 40H136a40.12 40.12 0 0 1-40-40V224'/%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M352 224h40a56.16 56.16 0 0 1 56 56v80a56.16 56.16 0 0 1-56 56h-40'/%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M224 256v160m64-160v160M160 256v160m160-304a48 48 0 0 1 0 96c-13.25 0-29.31-7.31-38-16H160c-8 22-27 32-48 32a48 48 0 0 1 0-96a47.9 47.9 0 0 1 26 9'/%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M91.86 132.43a40 40 0 1 1 60.46-52S160 91 160 96m-14.17-31.29C163.22 44.89 187.57 32 216 32c52.38 0 94 42.84 94 95.21a95 95 0 0 1-1.67 17.79'/%3E%3C/svg%3E");
	}

	.sandwich {
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23000' d='M441.6 47.65c-5.8 0-12.1.65-18.9 1.92c-20.9 3.87-46.1 13.56-73.2 27.53c-5.7 2.93-11.5 6.04-17.3 9.33c11.4 3.5 22.9 7.26 32.7 11.65c8.8 3.82 16.4 8.12 21.9 14.42c5.5 6.4 7.7 16.7 3.5 25.3c-2.8 5.7-7.4 7-11.4 8.1c-4.1 1-8.6 1.5-13.7 1.7c-10.3.5-23.3-.2-37.5-1.6c-23.2-2.2-49.6-6.2-71.3-10.5c-13.6 9.8-27.2 20.1-40.7 30.8c11.3 3.6 21.9 8.3 31.1 13.6c10.4 6 18.9 12.5 24.5 19.9c2.8 3.8 5 7.9 5.5 12.8c.5 5-1.4 10.6-5.1 14.3c-8.1 8.3-19.4 8.6-32.3 8.4c-12.8-.1-27.7-2.1-42.5-4.7c-16.5-3-32.3-6.6-44.7-9.8c-16.3 14.9-31.6 29.9-45.8 44.5c9.6 3.7 20 8.5 29.3 13.6c8 4.4 15.1 8.9 20.4 14c2.7 2.5 5 5.1 6.6 8.7s2 9-.4 13.2v.1c-2.7 4.5-6.5 6.2-10.2 7.6c-3.6 1.4-7.7 2.4-12.3 3.1c-9.2 1.5-20.2 2.2-31.8 2.4c-19.55.3-39.81-.9-53.58-3.1c-3.33 4.4-6.47 8.6-9.37 12.8c-14.01 20.1-22.6 37.6-24.54 48.7c-.97 5.6-.34 9.1.81 11.2c1.14 2.1 2.91 3.7 7.74 5c9.18 2.3 24.81.5 44.11-6.3s42.23-18 67.03-32.5c49.6-29 106.6-70.7 159.1-114.6s100.5-90 132.2-127.6c15.8-18.8 27.6-35.45 33.6-47.93c3-6.25 4.5-11.42 4.8-14.71c.2-2.78-.1-3.68-.7-4.36c-6.5-4.27-14.9-6.64-25.1-6.92h-2.5zM311.1 98.83c-11.2 6.87-22.6 14.27-34.1 22.07c17.1 3 35.8 5.6 52.5 7.2c13.7 1.3 26.1 1.9 34.9 1.5c4.4-.2 7.9-.6 9.8-1.1c.6-.2.5-.2.7-.3c.5-1.5.1-1.9-1.7-3.9c-2.3-2.7-8-6.4-15.6-9.8c-12.6-5.6-30.1-10.7-46.5-15.67m159.3 1.47c-6.8 10.1-15.3 21.2-25.2 32.9c-10.8 12.8-23.3 26.4-37.1 40.6c9.1.4 19.1-.4 29.3-2.9c18.2-4.5 33.5-13.3 43.1-23c9.5-9.8 13-19.7 10.9-28.2c-2-8.2-9.1-15.2-21-19.4m-272.1 80.2c-7 5.8-13.9 11.6-20.7 17.5c-3.1 2.7-6.2 5.4-9.3 8.2c9.8 2.3 20.8 4.7 31.8 6.7c14.2 2.5 28.4 4.3 39.6 4.4c11.1.2 18.8-2.7 19.2-3c-.1-.4-.5-1.7-2-3.7c-3-4.1-10-9.9-19.1-15c-11.1-6.4-25.4-12-39.5-15.1m193.6 9.4c-19.9 19.5-42 39.7-65.2 59.6c5.3.8 10.9 1.3 16.7 1.3c18.8 0 35.7-4.9 47.3-12.1s17.3-16 17.3-24.8c0-8.5-5.3-16.9-16.1-24m87.6.7c-2.5 2.5-5.1 5.1-8 7.5c-60.4 51.1-133.4 117.2-206.9 169.2c-72.4 51.3-145.3 89.7-209.52 84.4c6.98 5.1 14.36 8.2 21.77 10.1c18.94 5 38.55 1.5 49.75-1.7c80.8-23.3 166.8-80.4 233.1-134.6c33.1-27.1 61.3-53.4 81.5-74.3c10.1-10.4 18.2-19.4 23.9-26.4c5.7-6.9 8.9-13.2 8.7-12.3q3.45-11.7 5.7-21.9m-170.1 73.5c-22.9 19.2-46.6 37.9-70.3 55.4c5.4.7 11 1.1 16.8 1.1c20.2 0 38.4-4.7 50.8-11.7s18.3-15.4 18.3-23.2c0-7.2-5-14.9-15.6-21.6M92.8 279.7c-9.06 9.8-17.47 19.3-25.14 28.6c11.51 1.1 26.35 1.8 40.14 1.7c11-.2 21.4-.9 29.1-2.1c3-.5 5.2-1.2 7-1.7c-.1-.2 0-.1-.1-.2c-3.3-3.2-9.5-7.4-16.8-11.4c-10.7-5.9-23.9-11.5-34.2-14.9m120.7 58.2c-22 15.4-43.6 29.4-64.2 41.4c-6.3 3.7-12.4 7.1-18.5 10.4c8.1 1.8 17.1 2.8 26.4 2.8c20.2 0 38.4-4.7 50.8-11.7s18.3-15.4 18.3-23.2c0-6.5-4.2-13.5-12.8-19.7m-109.9 65.4c-8.54 3.9-16.71 7.3-24.48 10c-19.44 6.8-36.52 10.2-51.14 7.4c1 1 2.09 1.9 3.29 2.8c7.44 5.6 18.33 9.3 30.54 9.3s23.1-3.7 30.54-9.3c7.42-5.5 11.25-12.3 11.25-19.5z'/%3E%3C/svg%3E");
	}

	.canette {
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' color='%23000'%3E%3Cpath d='M5.927 3.887L6.9 2.72c.295-.354.443-.531.644-.626C7.746 2 7.976 2 8.437 2h7.126c.46 0 .691 0 .893.094c.201.095.349.272.644.626l.973 1.167c.459.551.688.826.808 1.156c.119.33.119.689.119 1.405v11.104c0 .716 0 1.075-.12 1.405c-.119.33-.348.605-.807 1.156L16.8 21.64c-.148.177-.221.266-.322.313c-.1.047-.216.047-.446.047H7.968c-.23 0-.345 0-.446-.047c-.1-.047-.174-.136-.322-.313l-1.273-1.527c-.459-.551-.688-.826-.808-1.156C5 18.627 5 18.268 5 17.552V6.448c0-.716 0-1.075.12-1.405c.119-.33.348-.605.807-1.156M5 5h14M5 19h14M6 2h12'/%3E%3Ccircle cx='12' cy='12' r='2.5'/%3E%3C/g%3E%3C/svg%3E");
	}

	.eau {
		color: #2461ae;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 22q-3.425 0-5.712-2.35T4 13.8q0-1.55.7-3.1t1.75-2.975T8.725 5.05T11 2.875q.2-.2.463-.287T12 2.5t.538.088t.462.287q1.05.925 2.275 2.175t2.275 2.675T19.3 10.7t.7 3.1q0 3.5-2.287 5.85T12 22m.275-3q.3-.025.513-.238T13 18.25q0-.35-.225-.562T12.2 17.5q-1.025.075-2.175-.562t-1.45-2.313q-.05-.275-.262-.45T7.825 14q-.35 0-.575.263t-.15.612q.425 2.275 2 3.25t3.175.875'/%3E%3C/svg%3E");
	}

	.carte-boisson {
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' color='%23000'%3E%3Cpath d='M2 12c0-4.007 0-6.01 1.172-7.255S6.229 3.5 10 3.5h4c3.771 0 5.657 0 6.828 1.245S22 7.993 22 12s0 6.01-1.172 7.255S17.771 20.5 14 20.5h-4c-3.771 0-5.657 0-6.828-1.245S2 16.007 2 12'/%3E%3Cpath d='M6.888 10.831c.939-.548 1.758-.327 2.25.025c.202.144.303.216.362.216c.06 0 .16-.072.362-.216c.492-.352 1.311-.573 2.25-.025c1.232.72 1.51 3.094-1.33 5.097c-.542.381-.813.572-1.282.572s-.74-.19-1.281-.572c-2.841-2.003-2.563-4.377-1.33-5.097M18 16.5h-3'/%3E%3C/g%3E%3C/svg%3E");
	}

	.cafe {
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3Cpath d='M17 11.6V15a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-3.4a.6.6 0 0 1 .6-.6h12.8a.6.6 0 0 1 .6.6M12 9c0-1 .714-2 2.143-2v0A2.857 2.857 0 0 0 17 4.143V3.5M8 9v-.5a3 3 0 0 1 3-3v0a2 2 0 0 0 2-2V3'/%3E%3Cpath d='M16 11h2.5a2.5 2.5 0 0 1 0 5H17'/%3E%3C/g%3E%3C/svg%3E");
	}

	.glace {
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='m352 256l-96 224l-62-145'/%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M299.42 223.48C291.74 239.75 275.18 252 256 252c-13.1 0-27-5-33.63-9.76C216.27 237.87 208 240 208 250v62a24.07 24.07 0 0 1-24 24h0a24.07 24.07 0 0 1-24-24v-56h-2c-35.35 0-62-28.65-62-64a64 64 0 0 1 64-64h8v-8a88 88 0 0 1 176 0v8h8a64 64 0 0 1 0 128c-21.78 0-42-13-52.59-32.51Z'/%3E%3C/svg%3E");
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
