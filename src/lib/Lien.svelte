<script lang="ts">
	import Icone from '$lib/Icone.svelte';

	let {
		libelle = undefined,
		apparence = 'lien',
		actif = $bindable(true),
		envoiEnCours = $bindable(),
		children,
		variante = 'primaire',
		taille = 'lg',
		id = undefined,
		icone = undefined,
		href
	} = $props();
</script>

<a {href} {id} class={`${apparence} ${variante} ${taille}`}>
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
</a>

<style lang="scss">
  @import "apparence-bouton";

  .bouton {
    text-decoration: none;
  }
</style>
