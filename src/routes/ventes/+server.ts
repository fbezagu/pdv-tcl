import type { RequestHandler } from './$types';
import { error, text } from '@sveltejs/kit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { env } from '$env/dynamic/private';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export const POST: RequestHandler = async ({ request }) => {
	let idUtilisateur: string | null;
	const token = request.headers.get('Authorization')?.substring(7);
	if (!token) {
		throw error(401, 'Tu n’es pas connecté');
	}
	try {
		const jeton = jwt.verify(token, env.SECRET_JWT);
		idUtilisateur = (jeton as JwtPayload).id as string;
	} catch {
		throw error(401, 'Le jeton a expiré');
	}

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
			mode,
			idUtilisateur
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
