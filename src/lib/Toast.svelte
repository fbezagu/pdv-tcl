<script lang="ts">
	import BoutonAuto from '$lib/BoutonAuto.svelte';

	let { titre, description } = $props();
	let fermeture : BoutonAuto;

	let visible = $state(false);

	export const affiche = () => {
		visible = true;
		fermeture.reset();
	};

	const cacher = () => {
		visible = false;
	};
</script>
<div class="toast" class:visible>
	<div class="notification">
		<div class="titre">
			{titre}
			<BoutonAuto click={cacher} bind:this={fermeture}></BoutonAuto>
		</div>
		<div class="description">
			{description}
		</div>
	</div>
</div>

<style lang="scss">

  .toast {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 16px;
    z-index: 10;
    box-sizing: border-box;
    display: none;

    &.visible {
      display: block;
    }

    .notification {
      background-color: rgba(216, 255, 227, 0.95);
      border: 1px solid #24ae40;
      padding: 16px;
      border-radius: 8px;
      box-shadow: color(srgb 0.231373 0.509804 0.964706 / 0.04);

      .titre {
        font-weight: 500;
        color: #24ae40;
        margin: 0 0 4px;
				display: flex;
				justify-content: space-between;
      }

      .description {
        font-size: 0.875rem;
      }
    }
  }
</style>