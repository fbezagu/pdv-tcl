<script lang="ts">
	import { modePaiement, modesPaiement } from '$lib/panier.svelte';
</script>
<div class="modes-paiement">
	{#each Object.entries(modesPaiement) as [id, libelle] (id)}
		<label class:actif={modePaiement.courant === id}>
			<span class={id}></span>
			<input type="radio" value={id} bind:group={modePaiement.courant} />
			{libelle}
		</label>
	{/each}
</div>

<style lang="scss">
	.modes-paiement{
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
		//color: #6b6b6b;
		font-size: 14px;
		margin: 2px;

		&.actif {
      color: #2b2bd5;
			border: 1px solid #2b2bd5;
      outline: 1px solid #2b2bd5;
      box-shadow: 0 5px 10px 0 rgb(43, 43, 213, 30%);
		}

		&:hover {
			background: #ededf5;
			box-shadow: 0 5px 10px 0 rgb(43, 43, 213, 20%);
		}
	}

	input{
		display: none;
	}

  .ri--bank-card-fill, .CB {
    display: inline-block;
    width: 24px;
    height: 24px;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M22.005 10v10a1 1 0 0 1-1 1h-18a1 1 0 0 1-1-1V10zm0-2h-20V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1zm-7 8v2h4v-2z'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }

  .ri--cash-fill, .ESP {
    display: inline-block;
    width: 24px;
    height: 24px;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M3.005 4.003h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-18a1 1 0 0 1-1-1v-14a1 1 0 0 1 1-1M6.5 6H4v2.5A2.5 2.5 0 0 0 6.5 6m11 0A2.5 2.5 0 0 0 20 8.5V6zM4 15.5V18h2.5A2.5 2.5 0 0 0 4 15.5M17.5 18H20v-2.5a2.5 2.5 0 0 0-2.5 2.5M12 16a4 4 0 1 0 0-8a4 4 0 0 0 0 8'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }

  .mdi--cheque-book, .CHQ {
    display: inline-block;
    width: 24px;
    height: 24px;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M5 14h14v1H5zm16 3V8H3v9zM1 5h22v14H1zm4 5h7v2H5z'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }

  .hugeicons--loyalty-card, .CARTB {
    display: inline-block;
    width: 24px;
    height: 24px;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' color='%23000'%3E%3Cpath d='M2 12c0-4.007 0-6.01 1.172-7.255S6.229 3.5 10 3.5h4c3.771 0 5.657 0 6.828 1.245S22 7.993 22 12s0 6.01-1.172 7.255S17.771 20.5 14 20.5h-4c-3.771 0-5.657 0-6.828-1.245S2 16.007 2 12'/%3E%3Cpath d='M6.888 10.831c.939-.548 1.758-.327 2.25.025c.202.144.303.216.362.216c.06 0 .16-.072.362-.216c.492-.352 1.311-.573 2.25-.025c1.232.72 1.51 3.094-1.33 5.097c-.542.381-.813.572-1.282.572s-.74-.19-1.281-.572c-2.841-2.003-2.563-4.377-1.33-5.097M18 16.5h-3'/%3E%3C/g%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }
</style>