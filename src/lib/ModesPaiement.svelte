<script lang="ts">
	import { modePaiement, modesPaiement } from '$lib/panier.svelte';
</script>
<div class="modes-paiement">
	{#each Object.entries(modesPaiement) as [id, libelle] (id)}
		<label>
			<input type="radio" value={id} bind:group={modePaiement.courant} />
			{libelle}
		</label>
	{/each}
</div>