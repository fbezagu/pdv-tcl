<script lang="ts">
	const { icone, taille } = $props();

</script>

<span class={`icone ${icone} ${taille}`}></span>

<style lang="scss">
  .icone {
    display: inline-block;
		width: var(--largeur);
		height: var(--largeur);
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }

	.sm {
		--largeur: 16px;
	}
	.md {
		--largeur: 24px;
	}

  .horloge {
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 21q-3.15 0-5.575-1.912T3.275 14.2q-.1-.375.15-.687t.675-.363q.4-.05.725.15t.45.6q.6 2.25 2.475 3.675T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H8q.425 0 .713.288T9 9t-.288.713T8 10H4q-.425 0-.712-.288T3 9V5q0-.425.288-.712T4 4t.713.288T5 5v1.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21m1-9.4l2.5 2.5q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-2.8-2.8q-.15-.15-.225-.337T11 11.975V8q0-.425.288-.712T12 7t.713.288T13 8z'/%3E%3C/svg%3E");
  }

	.utilisateur {
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M19.652 19.405c.552-.115.882-.693.607-1.187c-.606-1.087-1.56-2.043-2.78-2.771C15.907 14.509 13.98 14 12 14s-3.907.508-5.479 1.447c-1.22.728-2.174 1.684-2.78 2.771c-.275.494.055 1.072.607 1.187a37.5 37.5 0 0 0 15.303 0'/%3E%3Ccircle cx='12' cy='8' r='5' fill='%23000'/%3E%3C/svg%3E");
  }

	.gooey-balls {
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cdefs%3E%3Cfilter id='svgSpinnersGooeyBalls20'%3E%3CfeGaussianBlur in='SourceGraphic' result='y' stdDeviation='1'/%3E%3CfeColorMatrix in='y' result='z' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7'/%3E%3CfeBlend in='SourceGraphic' in2='z'/%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23svgSpinnersGooeyBalls20)'%3E%3Ccircle cx='5' cy='12' r='4' fill='%23000'%3E%3Canimate attributeName='cx' calcMode='spline' dur='2s' keySplines='.36,.62,.43,.99;.79,0,.58,.57' repeatCount='indefinite' values='5;8;5'/%3E%3C/circle%3E%3Ccircle cx='19' cy='12' r='4' fill='%23000'%3E%3Canimate attributeName='cx' calcMode='spline' dur='2s' keySplines='.36,.62,.43,.99;.79,0,.58,.57' repeatCount='indefinite' values='19;16;19'/%3E%3C/circle%3E%3CanimateTransform attributeName='transform' dur='0.75s' repeatCount='indefinite' type='rotate' values='0 12 12;360 12 12'/%3E%3C/g%3E%3C/svg%3E");
	}
</style>