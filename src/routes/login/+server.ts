import { json, type RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = () => {
	const token = jwt.sign({ id: 'fabien' }, env.SECRET_JWT, { expiresIn: '5m' });
	return json({ token });
};
