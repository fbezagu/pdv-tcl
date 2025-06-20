<script lang="ts">
	import { ajouteAuPanier } from '$lib/panier.svelte';

	export let increment: number;
	export let idArticle: string;

	const incremente = () => ajouteAuPanier(idArticle, increment);
</script>
<button onclick={incremente}>+{increment}</button>