<script lang="ts">
	import Icone from '$lib/Icone.svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLButtonAttributes {
		libelle?: string;
		actif?: boolean;
		envoiEnCours?: boolean;
		children?: Snippet<[]> ;
		onclick?: (() => void) ;
		variante?: 'primaire' | 'danger';
		taille?: 'lg';
		icone?: string;
	}

	let {
		libelle = undefined,
		actif = $bindable(true),
		envoiEnCours = $bindable(),
		children = undefined,
		onclick = undefined,
		variante = 'primaire',
		taille = 'lg',
		id = undefined,
		icone = undefined,
		...autres
	}: Props = $props();
</script>

<button
	{id}
	disabled={!actif || envoiEnCours}
	{onclick}
	class={`bouton ${variante} ${taille}`}
	{...autres}
>
	{#if icone}
		<Icone {icone} taille="sm" />
	{/if}
	{#if libelle}
		{libelle}
	{:else}
		{@render children?.()}
	{/if}

	{#if envoiEnCours}
		<Icone icone="gooey-balls" {taille} />
	{/if}
</button>

<style lang="scss">
  @import 'apparence-bouton';
</style>
