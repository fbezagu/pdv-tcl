export type IdModePaiement = 'CB' | 'CHQ' | 'ESP' | 'CARTB';

export interface Article {
	id: string;
	prix: number;
	nom: string;
	actif: boolean;
	icone?:string;
	modesPaiementAutorises: IdModePaiement[];
}

export type InformationsConnexion = { login: string; motDePasse: string };
