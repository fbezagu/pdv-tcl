<script lang="ts">
	import Login from '$lib/Login.svelte';
</script>

<main>
	<h1>Connexion</h1>
	<Login />
	<div>
		Pas encore de compte ? <a href="/inscription">S’inscrire</a>
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
