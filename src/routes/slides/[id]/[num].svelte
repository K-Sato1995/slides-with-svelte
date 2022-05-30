<script lang="ts">
	export let slide: any;
	export let maxSlideNum: number;
	import SvelteRenderer from '$lib/svelteRenderer.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const params = $page.params;
	const basePath = $page.url.origin;
	const { id, num } = params;

	let pageNum = parseInt(num);

	const nextPage = () => {
		if (pageNum < maxSlideNum) {
			pageNum += 1;
			goto(`${basePath}/slides/${id}/${pageNum}`);
		}
	};

	const prevPage = () => {
		if (pageNum > 1) {
			pageNum -= 1;
			goto(`${basePath}/slides/${id}/${pageNum}`);
		}
	};

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.repeat) return;
		switch (event.key) {
			case 'ArrowLeft':
				event.preventDefault();
				prevPage();
				break;

			case 'ArrowRight':
				event.preventDefault();
				nextPage();
				break;
		}
	};
</script>

<svelte:window on:keydown={onKeyDown} />
<div class="slide-container">
	<div class="slide-content">
		<SvelteRenderer children={slide} />
	</div>

	<button on:click={prevPage}> - </button>
	<button on:click={nextPage}> + </button>
</div>



<style>
.slide-container {
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #000;
}
.slide-content {
	border: solid 1px;
    height: 551px;
    width: 980px;
    transform: translate(-50%, -50%) scale(1.21633);
    position: absolute;
    left: 50%;
    top: 50%;
	background-color: #fff;
}
</style>