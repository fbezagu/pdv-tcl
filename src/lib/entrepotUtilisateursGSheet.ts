import { env } from '$env/dynamic/private';
import axios from 'axios';

export type Utilisateur = {
	login: string;
	motDePasse: string;
};

export const entrepotUtilisateursGSheet = () => ({
	parLogin: async (login: string) => {
		const urlApiFeuille = `${env.STEINHQ_URL}Utilisateurs`;

		const reponse = await axios.get(urlApiFeuille, {
			auth: {
				username: env.STEINHQ_UTILISATEUR,
				password: env.STEINHQ_MOT_PASSE
			}
		});

		const utilisateursGSheet = reponse.data as Utilisateur[];
		return utilisateursGSheet.find((u) => u.login === login);
	},

	ajoute: async (utilisateur: Utilisateur) => {
		const urlApiFeuille = `${env.STEINHQ_URL}Utilisateurs`;
		await axios.post(urlApiFeuille, [utilisateur], {
			auth: {
				username: env.STEINHQ_UTILISATEUR,
				password: env.STEINHQ_MOT_PASSE
			}
		});
	}
});
