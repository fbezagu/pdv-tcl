import type { RequestHandler } from './$types';
import { text } from '@sveltejs/kit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
	const urlApiFeuille = `${env.STEINHQ_URL}TableVentes`;

	const date = new Date();
	const idPanier = uuidv4();

	const panier = await request.json();
	const { articles, mode } = panier;
	const ventes = Object.keys(articles)
		.filter((idArticle) => articles[idArticle] > 0)
		.map((idArticle) => ({
			id: idArticle,
			quantite: articles[idArticle],
			idPanier,
			date,
			mode
		}));

	if (ventes.length > 0) {
		await axios.post(urlApiFeuille, ventes, {
			auth: {
				username: env.STEINHQ_UTILISATEUR,
				password: env.STEINHQ_MOT_PASSE
			}
		});
	}
	return text('ok');
};
