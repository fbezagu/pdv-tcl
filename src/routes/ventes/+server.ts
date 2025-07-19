import type { RequestHandler } from './$types';
import { error, json, text } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import { env } from '$env/dynamic/private';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { entrepotVentesGSheet } from '$lib/entrepotVentesGSheet';

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

	const panier = await request.json();

	const vente = {
		articles: panier.articles,
		idPanier: uuidv4(),
		date: new Date(),
		mode: panier.mode,
		idUtilisateur
	};

	await entrepotVentesGSheet().ajoute(vente);

	return text('ok');
};

export const GET: RequestHandler = async () => {
	return json(await entrepotVentesGSheet().toutes());
};
