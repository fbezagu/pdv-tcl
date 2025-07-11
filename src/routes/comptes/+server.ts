import { error, json, type RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import type { InformationsConnexion } from '$lib/types';
import bcrypt from 'bcrypt';
import { entrepotUtilisateursGSheet } from '$lib/entrepotUtilisateursGSheet';

export const POST: RequestHandler = async ({ request }) => {
	const donneesInscription = (await request.json()) as InformationsConnexion;
	const { login, motDePasse } = donneesInscription;

	const entrepotUtilisateurs = entrepotUtilisateursGSheet();

	const utilisateur = await entrepotUtilisateurs.parLogin(login);
	if (utilisateur) {
		throw error(400, 'Ce login est déjà utilisé');
	}

	const motDePasseHache = await bcrypt.hash(motDePasse, 12);

	await entrepotUtilisateurs.ajoute({ login, motDePasse: motDePasseHache });

	const token = jwt.sign({ id: login }, env.SECRET_JWT, { expiresIn: '5m' });
	return json({ token });
};
