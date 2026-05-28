import type {Article, IdModePaiement} from '$lib/types';
import {goto} from "$app/navigation";

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

export const estPanierVide =()=>{
	return !Object.values(panier).some(value => value>0);
}

export const modesPaiement: Record<IdModePaiement, string> = {
	CB: 'Carte bleue',
	ESP: 'Espèces',
	CHQ: 'Chèque',
	CARTB: 'Carte boisson',
	OFF:'Offert'
};

export const modePaiement = $state({ courant: undefined });

export const prixUnitaireArticle = (article: Article) => {
	return modePaiement.courant === "OFF" ? 0 : article.prix;
}

export const totalPanier = (articles:Article[]) => {
	return articles.reduce((acc: number, article: Article) => {
		return acc + prixUnitaireArticle(article) * quantiteDansPanier(article.id);
	}, 0);
};

export const nombreArticlesDansPanier=(articles:Article[]) => {
	return articles.reduce((acc: number, article: Article) => {
		return acc + quantiteDansPanier(article.id);
	}, 0);
}