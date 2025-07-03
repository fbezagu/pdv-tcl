import type { Article } from '$lib/types';

const DEMO = false;

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
