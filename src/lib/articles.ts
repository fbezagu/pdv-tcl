import type { Article } from '$lib/types';

const DEMO = false;

export const chargeArticles = async () => {
	if (DEMO) {
		return [
			{
				id: 'biere',
				nom: 'Bière',
				prix: 2
			},
			{
				id: 'canette',
				nom: 'Canette / bière bouteille',
				prix: 2
			},
			{
				id: 'eau',
				nom: 'Bouteille Eau 1,5L',
				prix: 1
			},
			{
				id: 'carte-boisson',
				nom: 'Carte boisson (10 + 1GT)',
				prix: 20
			},
			{
				id: 'cafe',
				nom: 'Café',
				prix: 1
			},
			{
				id: 'sandwich',
				nom: 'Petite brasserie (frites, sandwich, panini, hotdog)',
				prix: 3
			},
			{
				id: 'glace',
				nom: 'Glace',
				prix: 2
			}
		];
	}
	const reponse = await fetch('/articles');
	return (await reponse.json()) as Article[];
};
