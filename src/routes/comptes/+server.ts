import { error, json, type RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import type { InformationsConnexion } from '$lib/types';
import bcrypt from 'bcrypt';
import axios from 'axios';

type UtilisateurGSheet = {
	login: string;
	motDePasse: string;
};

export const POST: RequestHandler = async ({ request }) => {
	const donneesInscription = (await request.json()) as InformationsConnexion;
	const { login, motDePasse } = donneesInscription;

	const urlApiFeuille = `${env.STEINHQ_URL}Utilisateurs`;

	const reponse = await axios.get(urlApiFeuille, {
		auth: {
			username: env.STEINHQ_UTILISATEUR,
			password: env.STEINHQ_MOT_PASSE
		}
	});

	const utilisateursGSheet = reponse.data as UtilisateurGSheet[];
	if (utilisateursGSheet.some((u) => u.login === login)) {
		throw error(400, 'Ce login est déjà utilisé');
	}

	const motDePasseHache = await bcrypt.hash(motDePasse, 12);

	await axios.post(
		urlApiFeuille,
		[{ login, motDePasse: motDePasseHache }],
		{
			auth: {
				username: env.STEINHQ_UTILISATEUR,
				password: env.STEINHQ_MOT_PASSE
			}
		}
	);

	const token = jwt.sign({ id: login }, env.SECRET_JWT, { expiresIn: '5m' });
	return json({ token });
};
