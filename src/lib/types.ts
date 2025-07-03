export type IdModePaiement = 'CB' | 'CHQ' | 'ESP' | 'CARTB';

export interface Article {
	id: string;
	prix: number;
	nom: string;
	actif: boolean;
	modesPaiementAutorises: IdModePaiement[];
}
