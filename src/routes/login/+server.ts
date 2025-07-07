import { error, json, type RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
	const donneesConnexion = (await request.json()) as { login: string; motDePasse: string };
	const { login } = donneesConnexion;

	if (login === 'fabien') {
		const token = jwt.sign({ id: login }, env.SECRET_JWT, { expiresIn: '5m' });
		return json({ token });
	}
	throw error(401, 'Utilisateur ou mot de passe invalide');
};
