<script lang="ts">
	let { click } = $props();

	export const reset = () => {
		setTimeout(() => click(), 4900);
	};
</script>

<button class="cont" onclick={click} aria-label="bouton automatique">
	<div class="spinner"></div>
	<span class="number"></span>
</button>

<style lang="scss">
	.cont {
		color: #015335;
		--diametre: 24px;
		width: var(--diametre);
		height: var(--diametre);
		position: relative;
		text-align: center;
		font-weight: bold;
		border: 1px solid color-mix(in srgb, currentColor 60%, transparent);
		border-radius: 50%;
		overflow: hidden;

		&::after {
			content: '';
			--rond-interieur: calc(var(--diametre) * 0.7);
			width: var(--rond-interieur);
			height: var(--rond-interieur);
			position: absolute;
			top: calc((var(--diametre) - var(--rond-interieur) - 4px) / 2);
			left: calc((var(--diametre) - var(--rond-interieur) - 4px) / 2);
			border: 1px solid color-mix(in srgb, currentColor 60%, transparent);
			border-radius: 50%;
			background: white;
		}
	}

	.spinner {
		position: absolute;
		top: 50%;
		left: 50%;
		width: calc(var(--diametre) / 2);
		height: calc(var(--diametre) * 0.4);
		transform-origin: 0 0;
		background-image: linear-gradient(currentColor, transparent);
		animation: spin 1s infinite linear;

		@keyframes spin {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(-360deg);
			}
		}
	}

	.number {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 2;
		transform: translate(-50%, -50%);
		width: var(--diametre);
		height: var(--diametre);

		&::after {
			content: '';
			width: var(--diametre);
			height: var(--diametre);
			position: absolute;
			top: 0;
			left: 0;
			font-size: calc(var(--diametre) * 0.6);
			line-height: var(--diametre);
			animation: count 5s infinite steps(5, start);

			@keyframes count {
				0% {
					content: '5';
				}
				20% {
					content: '4';
				}
				40% {
					content: '3';
				}
				60% {
					content: '2';
				}
				80% {
					content: '1';
				}
				100% {
					content: '0';
				}
			}
		}
	}
</style>
