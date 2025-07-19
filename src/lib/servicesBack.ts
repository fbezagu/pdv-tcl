import type { Article } from '$lib/types';

const DEMO = true;

export const chargeArticles = async (): Promise<Article[]> => {
	if (DEMO) {
		return [
			{
				id: 'biere',
				nom: 'Bière',
				prix: 2,
				actif: true,
				modesPaiementAutorises: ['CHQ', 'CB', 'CARTB', 'ESP']
			},
			{
				id: 'canette',
				nom: 'Canette / bière bouteille',
				prix: 2,
				actif: true,
				modesPaiementAutorises: ['CHQ', 'CB', 'CARTB', 'ESP']
			},
			{
				id: 'eau',
				nom: 'Bouteille Eau 1,5L',
				prix: 1,
				actif: true,
				modesPaiementAutorises: ['CHQ', 'CB', 'ESP']
			},
			{
				id: 'carte-boisson',
				nom: 'Carte boisson (10 + 1GT)',
				prix: 20,
				actif: true,
				modesPaiementAutorises: ['CHQ', 'CB', 'ESP']
			},
			{
				id: 'cafe',
				nom: 'Café',
				prix: 1,
				actif: true,
				modesPaiementAutorises: ['CHQ', 'CB', 'ESP']
			},
			{
				id: 'sandwich',
				nom: 'Petite brasserie (frites, sandwich, panini, hotdog)',
				prix: 3,
				actif: true,
				modesPaiementAutorises: ['CHQ', 'CB', 'ESP']
			},
			{
				id: 'glace',
				nom: 'Glace',
				prix: 2,
				actif: true,
				modesPaiementAutorises: ['CHQ', 'CB', 'ESP']
			}
		];
	}
	const reponse = await fetch('/articles');
	return (await reponse.json()) as Article[];
};

export const chargeVentes = async () => {
	if (DEMO) {
		return [
			{
				mode: 'ESP',
				idPanier: '0b2e22d9-e385-4349-82ba-a7e34d1338b8',
				idUtilisateur: 'fabien',
				date: '2025-07-06T18:11:46.474Z',
				articles: { biere: 1 }
			},
			{
				mode: 'CHQ',
				idPanier: '341ea88d-efcb-40d6-a553-605081aefa8d',
				idUtilisateur: 'fabien',
				date: '2025-07-06T18:15:19.503Z',
				articles: { canette: 1, cafe: 1 }
			},
			{
				mode: 'ESP',
				idPanier: '2a33e5fe-fdfe-426a-a80d-cd4c02cdd06a',
				idUtilisateur: 'Fabien',
				date: '2025-07-11T03:38:50.032Z',
				articles: { biere: 1, canette: 2, eau: 1, 'carte-boisson': 8 }
			},
			{
				mode: 'ESP',
				idPanier: '76593d6f-4405-47f1-811e-d28c75bba56c',
				idUtilisateur: 'Fabien',
				date: '2025-07-11T04:53:55.957Z',
				articles: { 'carte-boisson': 1 }
			},
			{
				mode: 'CB',
				idPanier: '6d3c2220-d84b-403e-9b34-ec3827c9befc',
				idUtilisateur: 'Fabien',
				date: '2025-07-12T06:05:34.924Z',
				articles: { canette: 4 }
			},
			{
				mode: 'CHQ',
				idPanier: '34e2376d-492c-45a6-8fa0-1f748f2a1a3a',
				idUtilisateur: 'Fabien',
				date: '2025-07-12T06:06:15.630Z',
				articles: { eau: 1 }
			},
			{
				mode: 'CARTB',
				idPanier: 'd465f10b-68bd-49f1-951b-9cefc6625b4d',
				idUtilisateur: 'Fabien',
				date: '2025-07-12T06:06:27.988Z',
				articles: { biere: 4, canette: 2 }
			},
			{
				mode: 'CHQ',
				idPanier: 'a26b174e-345c-4a3e-96cd-2ab3bb5cbf02',
				idUtilisateur: 'Fabien',
				date: '2025-07-12T06:10:08.371Z',
				articles: { canette: 1, sandwich: 1, glace: 1, 'tmc-vert': 2 }
			},
			{
				mode: 'CHQ',
				idPanier: '369b9f75-9b55-4cd3-bcbd-bb2d7f5f983c',
				idUtilisateur: 'Fabien',
				date: '2025-07-15T19:50:52.441Z',
				articles: { biere: 1, canette: 3 }
			}
		];
	}
	const reponse = await fetch('/ventes', { method: 'GET' });
	return await reponse.json();
};
