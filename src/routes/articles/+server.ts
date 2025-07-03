import type { RequestHandler } from '../../../.svelte-kit/types/src/routes/ventes/$types';
import { json } from '@sveltejs/kit';
import axios from 'axios';
import { env } from '$env/dynamic/private';

type ArticleGSheet = {
	Id: string;
	Nom: string;
	Prix: string;
	Compte: string;
	Actif: string;
	CHQ: string;
	CB: string;
	ESP: string;
	CARTB: string;
};

type ModePaiement = 'ESP' | 'CHQ' | 'CARTB' | 'CB';
const modesPaiement: ModePaiement[] = ['CHQ', 'CB', 'CARTB', 'ESP'];

export const GET: RequestHandler = async () => {
	const urlApiFeuille = `${env.STEINHQ_URL}Articles`;

	const reponse = await axios.get(urlApiFeuille, {
		auth: {
			username: env.STEINHQ_UTILISATEUR,
			password: env.STEINHQ_MOT_PASSE
		}
	});

	const modesPaiementAutorises = (source: ArticleGSheet) =>
		modesPaiement.reduce(
			(acc, p) => (source[p] === 'TRUE' ? [...acc, p] : acc),
			[] as ModePaiement[]
		);

	const articlesGSheet = reponse.data as ArticleGSheet[];
	const articles = articlesGSheet
		.filter((a) => a.Id)
		.map((source) => ({
			id: source.Id,
			nom: source.Nom,
			prix: parseInt(source.Prix.slice(0, -1)),
			actif: source.Actif === 'TRUE',
			modesPaiementAutorises: modesPaiementAutorises(source)
		}))
		.filter((a) => a.actif);
	return json(articles);
};
