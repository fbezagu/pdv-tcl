import { error, json, type RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import type { InformationsConnexion } from '$lib/types';
import bcrypt from 'bcrypt';
import { entrepotUtilisateursGSheet } from '$lib/entrepotUtilisateursGSheet';

export const POST: RequestHandler = async ({ request }) => {
	const donneesConnexion = (await request.json()) as InformationsConnexion;
	const { login, motDePasse } = donneesConnexion;

	const utilisateur = await entrepotUtilisateursGSheet().parLogin(login);

	if (utilisateur && (await bcrypt.compare(motDePasse, utilisateur.motDePasse))) {
		const token = jwt.sign({ id: login }, env.SECRET_JWT, { expiresIn: '5m' });
		return json({ token });
	}
	throw error(401, 'Utilisateur ou mot de passe invalide');
};
