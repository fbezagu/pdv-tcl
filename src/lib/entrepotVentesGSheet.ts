import { env } from '$env/dynamic/private';
import axios from 'axios';

export type Vente = {
	articles: Record<string, number>;
	idUtilisateur: string;
	idPanier: string;
	date: Date;
	mode: string;
};

type LigneVente = {
	idUtilisateur: string;
	idPanier: string;
	date: string;
	mode: string;
	id: string;
	quantite: number;
};

export const entrepotVentesGSheet = () => ({
	ajoute: async (vente: Vente) => {
		const lignesVente = Object.keys(vente.articles)
			.filter((idArticle) => vente.articles[idArticle] > 0)
			.map((idArticle) => ({
				id: idArticle,
				quantite: vente.articles[idArticle],
				idPanier: vente.idPanier,
				date: vente.date,
				mode: vente.mode,
				idUtilisateur: vente.idUtilisateur
			}));

		if (lignesVente.length > 0) {
			const urlApiFeuille = `${env.STEINHQ_URL}TableVentes`;
			await axios.post(urlApiFeuille, lignesVente, {
				auth: {
					username: env.STEINHQ_UTILISATEUR,
					password: env.STEINHQ_MOT_PASSE
				}
			});
		}
	},
	toutes: async (): Promise<Vente[]> => {
		const urlApiFeuille = `${env.STEINHQ_URL}TableVentes`;

		const reponse = await axios.get(urlApiFeuille, {
			auth: {
				username: env.STEINHQ_UTILISATEUR,
				password: env.STEINHQ_MOT_PASSE
			}
		});

		const lignes = reponse.data as LigneVente[];
		const ventes:Vente[]=[]
		lignes.reduce((acc:Vente[], ligne:LigneVente) => {
			let vente = acc.find((v) => v.idPanier === ligne.idPanier);
			if (!vente) {
				vente = {
					mode: ligne.mode,
					idPanier: ligne.idPanier,
					idUtilisateur: ligne.idUtilisateur,
					date: new Date(ligne.date),
					articles: {}
				};
				acc.push(vente);
			}
			vente.articles[ligne.id] = Number(ligne.quantite);
			return acc;
		}, ventes);
		return ventes;
	}
});
