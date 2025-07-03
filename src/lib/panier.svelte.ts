import type { IdModePaiement } from '$lib/types';

let panier: { [idArticle: string]: number } = $state({});

export const ajouteAuPanier = (idArticle: string, quantite: number) =>
	(panier[idArticle] = quantiteDansPanier(idArticle) + quantite);

export const quantiteDansPanier = (idArticle: string) => panier[idArticle] || 0;

export const videDuPanier = (idArticle: string) => (panier[idArticle] = 0);

export const panierSerialise = () =>
	JSON.stringify({
		articles: panier,
		mode: modePaiement.courant
	});

export const videPanier = () => {
	panier = {};
	modePaiement.courant = undefined
};

export const modesPaiement: Record<IdModePaiement, string> = {
	CB: 'Carte bleue',
	ESP: 'Espèces',
	CHQ: 'Chèque',
	CARTB: 'Carte boisson'
};

export const modePaiement = $state({ courant: undefined });
