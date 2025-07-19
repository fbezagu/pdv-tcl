<script lang="ts">
import Chargeur from '$lib/Chargeur.svelte';

const { active=$bindable(true), message } = $props();
</script>

<div class="chargement" class:active>
	<Chargeur />
	<p>{message}</p>
</div>

<style lang="scss">
  .chargement {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 36px;
    justify-content: center;
    height: 100vh;

    p {
      font-size: 18px;
      margin-bottom: 36px;
    }

    &.active {
      display: flex;
    }
  }
</style>