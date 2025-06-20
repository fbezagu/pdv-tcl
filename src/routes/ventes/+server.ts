import type { RequestHandler } from './$types';
import { text } from '@sveltejs/kit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
	const urlApiFeuille = `${env.STEINHQ_URL}TableVentes`;

	const date = new Date();
	const idPanier = uuidv4();
	const mode = 'CB';

	const panier = await request.json();
	const articles = panier.articles;
	const ventes = Object.keys(articles).map((idArticle) => ({
		id: idArticle,
		quantite: articles[idArticle],
		idPanier,
		date,
		mode
	}));

	await axios.post(urlApiFeuille, ventes, {
		auth: {
			username: env.STEINHQ_UTILISATEUR,
			password: env.STEINHQ_MOT_PASSE
		}
	});
	return text('ok');
};
