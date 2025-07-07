<script lang="ts">
	import Inscription from '$lib/Inscription.svelte';
</script>

<main>
	<h1>Inscription</h1>
	<Inscription />
	<div>
		Déjà un compte ? <a href="/login">Se connecter</a>
	</div>
</main>

<style lang="scss">
  :global(body) {
    font-family: Lato, sans-serif;
    font-size: 16px;
    color: #222;
    padding: 0;
    margin: 0;
  }

  main {
    margin: 40px 24px;

    div {
      margin: 48px 0;
      text-align: center;
      color: #444;
    }
  }
</style>
