<script lang="ts">
	import { modePaiement, modesPaiement } from '$lib/panier.svelte';
	import Icone from '$lib/Icone.svelte';
</script>
<div class="modes-paiement">
	{#each Object.entries(modesPaiement) as [id, libelle] (id)}
		<label class:actif={modePaiement.courant === id}>
			<Icone icone={id} taille="md"></Icone>
			<input type="radio" value={id} bind:group={modePaiement.courant} />
			{libelle}
		</label>
	{/each}
</div>

<style lang="scss">
  .modes-paiement {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }

  label {
    border: 1px solid #aaa;
    height: 60px;
    flex: 1 1 0;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    padding: 4px;
    text-align: center;
    font-size: 14px;
    margin: 2px;

    &.actif {
      color: #2461ae;
      border: 1px solid #2461ae;
      outline: 1px solid #2461ae;
      box-shadow: 0 5px 10px 0 rgb(43, 43, 213, 30%);
    }

    &:hover {
      background: #ededf5;
      box-shadow: 0 5px 10px 0 rgb(43, 43, 213, 20%);
    }
  }

  input {
    display: none;
  }
</style>