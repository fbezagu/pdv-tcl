<script lang="ts">
	import type { Article } from '$lib/types';
	import { quantiteDansPanier } from '$lib/panier.svelte';

	export let article: Article;
</script>

<button class="article">
	<span class={`icone ${article.id}`}></span>
	<span class="nom">{article.nom}</span>
	<span class="quantite"> {quantiteDansPanier(article.id)}</span>
</button>

<style lang="scss">
  .biere {
    display: inline-block;
    width: 24px;
    height: 24px;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M9 3a2 2 0 0 1 1.972 2.335l1.973.33a4 4 0 0 0-.005-1.361A2 2 0 0 1 15.733 7H5a1 1 0 1 1 .539-1.843a1 1 0 0 0 1.513-.614A2 2 0 0 1 9 3m1.516-1.703A4 4 0 0 0 5.51 3.043A3 3 0 0 0 3 8.236V20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2h2a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-2v-.354a4 4 0 0 0-4.896-6.169a4 4 0 0 0-1.588-1.18M17 18v-7h2v7zM7 11h2v7H7zm4 0h2v7h-2z'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }

  .article {
    border: 1px solid red;
    display: inline-flex;
    flex-direction: column;
    padding: 10px;
		width: 100px;
		height: 100px;
  }

	.nom{
		font-size: 12px;
		color: #0d0d0d;
	}

	.quantite {
		font-size: 12px;
		color: #2461ae;
	}

</style>