<script lang="ts">
	export let slide: any;
	export let maxSlideNum: number;
	import SvelteRenderer from '$lib/svelteRenderer.svelte';
	import Fullscreen from 'svelte-fullscreen';
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
	<Fullscreen let:onRequest let:onExit>
		<div class="slide-content">
			<SvelteRenderer children={slide} />
		</div>

		<div class="control-panel">
			<button on:click={() => onRequest()}>FullScreen</button>
			<button on:click={() => onExit()}>Screen</button>
			<button on:click={prevPage}> - </button>
			<button on:click={nextPage}> + </button>
		</div>
	</Fullscreen>
</div>

<style>
	.slide-container {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #000;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.slide-content {
		padding: 2rem;
		border: solid 1px;
		height: 551px;
		width: 980px;
		/* transform: scale(1.2); */
		background-color: #fff;	
	}

	.control-panel {
		width: 100%;
		height: 100px;
		position: absolute;
		bottom: 0;
		border: #fff solid 1px;
	}
</style>
