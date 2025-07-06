import { env } from '$env/dynamic/private';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export const GET: RequestHandler = async ({ request }) => {
	const token = request.headers.get('Authorization')?.substring(7);
	if (!token) {
		throw error(401, 'Tu n’es pas connecté');
	}
	try {
		const jeton = jwt.verify(token, env.SECRET_JWT);
		const id = (jeton as JwtPayload).id;
		return json({ id });
	} catch {
		throw error(401, 'Le jeton a expiré');
	}
};
