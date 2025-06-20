import type { RequestHandler } from '../../../.svelte-kit/types/src/routes/ventes/$types';
import { json } from '@sveltejs/kit';
import axios from 'axios';
import { env } from '$env/dynamic/private';

type ArticleGSheet = {
	Id: string;
	Nom: string;
	Prix: string;
	Compte: string;
	Actif: string;
};

export const GET: RequestHandler = async ({ request }) => {
	const urlApiFeuille = `${env.STEINHQ_URL}Articles`;

	const reponse = await axios.get(urlApiFeuille, {
		auth: {
			username: env.STEINHQ_UTILISATEUR,
			password: env.STEINHQ_MOT_PASSE
		}
	});

	const articlesGSheet = reponse.data as ArticleGSheet[];
	const articles = articlesGSheet
		.filter((a) => a.Id)
		.map((source) => ({
			id: source.Id,
			nom: source.Nom,
			prix: parseInt(source.Prix.slice(0, -1)),
			actif: source.Actif === 'TRUE'
		}))
		.filter((a) => a.actif);
	return json(articles);
};
