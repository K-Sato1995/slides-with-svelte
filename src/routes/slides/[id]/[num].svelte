<script lang="ts">
	export let slide: any;
	export let maxSlideNum: number;

	import { components } from '/Users/satokatsuki/WorkSpace/Svelte/slides-with-sveltekit/src/config/markdoc.js';
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
<SvelteRenderer children={slide} {components} />

<button on:click={prevPage}> - </button>
<button on:click={nextPage}> + </button>
