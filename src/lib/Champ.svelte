<script lang="ts">
	let { libelle, valeur = $bindable(), type = 'text', sousTitre = null, ...autres } = $props();
</script>

<label>
	<span>{libelle}</span>
	{#if sousTitre}
		<span class="sous-titre">{sousTitre}</span>
	{/if}
	<input {type} bind:value={valeur} {...autres} />
</label>

<style lang="scss">
  label {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  input {
    padding: 8px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ddd;

    &:hover {
      outline: 2px solid #2461ae;
    }
  }

  .sous-titre {
    font-size: 12px;
    color: #777;
  }
</style>
