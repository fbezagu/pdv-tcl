<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let login = $state('');
	let motDePasse = $state('');
	let erreurConnexion: string | null = $state(null);

	onMount(() => {
		localStorage.removeItem('authToken');
	});

	const connecte = async () => {
		const reponse = await fetch('/login', {
			method: 'POST',
			body: JSON.stringify({ login, motDePasse })
		});
		if (reponse.status === 200) {
			const data = await reponse.json();
			localStorage.setItem('authToken', data.token);
			goto('/');
		} else {
			erreurConnexion = (await reponse.json()).message;
		}
	};
</script>

<main>
	<form onsubmit={connecte}>
		<label>
			<span>Login</span>
			<input type="text" bind:value={login} />
		</label>
		<label>
			<span>Mot de passe</span>
			<input type="password" bind:value={motDePasse} />
		</label>
		<button> Se connecter</button>
		{#if erreurConnexion}
			<p class="erreur">{erreurConnexion}</p>
		{/if}
	</form>
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
  }

  form,
  label {
    display: flex;
    flex-direction: column;
  }

  form {
    gap: 16px;
  }

  label {
    gap: 4px;
  }

  input[type='text'],
  input[type='password'] {
    padding: 8px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ddd;

    &:hover {
      outline: 2px solid #2461ae;
    }
  }

  button {
    display: flex;
    gap: 16px;
    justify-content: center;
    border: none;
    background-color: #2461ae;
    color: white;
    padding: 12px;
    font-weight: bold;
    cursor: pointer;
    font-size: 18px;
    border-radius: 4px;

    &:hover:not(&[disabled]) {
      opacity: 90%;
    }

    &[disabled] {
      background-color: #888;
      cursor: not-allowed;
    }
  }

  .erreur {
		color: red;
	}
</style>
