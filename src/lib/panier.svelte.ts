let panier: { [idArticle: string]: number } = $state({});

export const ajouteAuPanier = (idArticle: string, quantite: number) =>
	(panier[idArticle] = quantiteDansPanier(idArticle) + quantite);

export const quantiteDansPanier = (idArticle: string) => panier[idArticle] || 0;

export const videDuPanier = (idArticle: string) => (panier[idArticle] = 0);

export const panierSerialise = () => JSON.stringify({ articles: panier });

export const videPanier = () => {
	panier = {};
};
