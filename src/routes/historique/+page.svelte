<script lang="ts">
	import { onMount } from 'svelte';
	import type { Article } from '$lib/types';
	import { enEuros } from '$lib/monnaie';
	import Tag from '$lib/Tag.svelte';
	import Icone from '$lib/Icone.svelte';
	import Chargement from '$lib/Chargement.svelte';
	import { chargeArticles, chargeVentes } from '$lib/servicesBack';
	import Entete from '$lib/Entete.svelte';

	type Vente = {
		idPanier: string;
		date: string;
		mode: string;
		idUtilisateur: string;
		articles: Record<string, number>;
	};

	let chargement = true;
	let ventes: Vente[] = [];
	type VentesParJour = Record<string, Vente[]>;
	let ventesParJour: VentesParJour = {};
	let articles: Article[] = [];

	onMount(async () => {
		chargement = true;
		articles = await chargeArticles();
		ventes = await chargeVentes();

		ventesParJour = ventes.reduce((acc: VentesParJour, vente: Vente) => {
			const date = new Date(vente.date);
			const jour = date.toISOString().slice(0, 10);
			if (!acc[jour]) acc[jour] = [];
			acc[jour].push(vente);
			return acc;
		}, {} as VentesParJour);
		chargement = false;
	});

	const montant = (vente: Vente) => {
		return Object.entries(vente.articles).reduce(
			(acc: number, [idArticle, quantite]: [string, number]) => {
				const article = articles.find((a) => a.id === idArticle);
				if (article) {
					acc += article.prix * quantite;
				}
				return acc;
			},
			0
		);
	};

	const heure = (isoDate: string) => {
		const date = new Date(isoDate);
		return Intl.DateTimeFormat('fr-FR', { timeStyle: 'short' }).format(date);
	};

	const formateJour = (jour: string) => {
		return jour.slice(8, 10) + '/' + jour.slice(5, 7) + '/' + jour.slice(0, 4);
	};

	const nomArticle = (idArticle: string) => articles.find((a) => a.id === idArticle)?.nom;

	$:jours = Object.keys(ventesParJour).toSorted((a, b) => b.localeCompare(a));

	const ventesParJourTriees = (jour: string) => {
		return ventesParJour[jour].toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	};
</script>

<Chargement active={chargement} message="Chargement des ventes" />
<div class="conteneur" class:active={!chargement}>
	<Entete courant="historique"/>
	<main>
		<h1>Historique des ventes</h1>

		{#each jours as jour (jour)}
			<h2>{formateJour(jour)}</h2>
			<div class="ventes">
				{#each ventesParJourTriees(jour) as vente (vente.idPanier)}
					<div class="vente">
						<div class="mode">
							<Icone icone={vente.mode} taille="md"></Icone>
							<span>{vente.mode}</span>
						</div>
						<div class="details">
							<span class="montant">{enEuros(montant(vente))}</span>
							<span class="heure">{heure(vente.date)}</span>
							<div class="articles">
								{#each Object.keys(vente.articles) as idArticle, index (index)}
									<Tag>
										{vente.articles[idArticle]} x {nomArticle(idArticle)}
									</Tag>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</main>
</div>

<style lang="css">
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
    }

    main {
        padding: 16px;
    }

    .ventes {
        display: flex;
        flex-direction: column;
        gap: 16px;
        border-radius: 8px;
        border: 1px solid #ddd;
        padding: 16px 0 0;
    }

    .vente {
        display: flex;
        gap: 16px;

        .mode {
            min-width: 48px;
            max-width: 48px;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            align-items: center;

            span {
                font-size: 8px;
            }
        }

        .details {
            padding-bottom: 16px;

            .montant {
                font-weight: bold;
            }

            .heure {
                margin-left: 8px;
                color: #777;
                font-size: 10px;
            }
        }
    }

    .articles {
        margin-top: 4px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
</style>
