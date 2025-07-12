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
	import { enEuros } from '$lib/monnaie';
	import { goto } from '$app/navigation';
	import Bouton from '$lib/Bouton.svelte';
	import Icone from '$lib/Icone.svelte';
	import Lien from '$lib/Lien.svelte';

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

	const logout = () => {
		goto('/login');
	};
</script>

<div class="chargement-articles" class:active={!articlesCharges}>
	<Chargeur />
	<p>Chargement des articles…</p>
</div>

<div class="conteneur">
	<header>
		<Lien href="/historique" apparence="bouton" variante="secondaire" taille="sm" icone="horloge">
			Historique
		</Lien>
		<div class="utilisateur">
			<Icone icone="utilisateur" taille="md" />
			<span>{idUtilisateur}</span>
			<button class="deconnexion" onclick={logout} title="Se déconnecter">Se déconnecter</button>
		</div>
	</header>
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
			justify-content: space-between;

			.utilisateur {
				display: flex;
				align-items: center;
				gap: 8px;
				justify-content: flex-end;
			}

			span {
				height: fit-content;
			}

			.deconnexion {
				display: inline-block;
				width: 24px;
				height: 24px;
				--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h6q.425 0 .713.288T12 20t-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12t.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z'/%3E%3C/svg%3E");
				background-color: currentColor;
				-webkit-mask-image: var(--svg);
				mask-image: var(--svg);
				-webkit-mask-repeat: no-repeat;
				mask-repeat: no-repeat;
				-webkit-mask-size: 100% 100%;
				mask-size: 100% 100%;
				cursor: pointer;
			}
		}

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
		}
	}

	.articles {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(156px, 1fr));
		gap: 16px;
	}
</style>
