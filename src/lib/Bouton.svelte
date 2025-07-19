<script lang="ts">
	import Icone from '$lib/Icone.svelte';

	let {
		libelle = undefined,
		actif = $bindable(true),
		envoiEnCours = $bindable(),
		children = undefined,
		onclick = undefined,
		variante = 'primaire',
		taille = 'lg',
		id = undefined,
		icone = undefined
	} = $props();
</script>

<button {id} disabled={!actif || envoiEnCours} {onclick} class={`bouton ${variante} ${taille}`}>
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
  @import "apparence-bouton";
</style>
