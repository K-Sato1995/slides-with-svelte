<script lang="ts">
	export let slide: any;
	import { components } from '/Users/satokatsuki/WorkSpace/Svelte/slides-with-sveltekit/src/config/markdoc.js';
	import SvelteRenderer from '$lib/svelteRenderer.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const params = $page.params;
	const basePath = $page.url.origin;
	const { id, num } = params;

	let pageNum = parseInt(num);

	const nextPage = () => {
		pageNum += 1;
		goto(`${basePath}/slides/${id}/${pageNum}`);
	};

	const prevPage = () => {
		pageNum -= 1;
		goto(`${basePath}/slides/${id}/${pageNum}`);
	};
</script>

<SvelteRenderer children={slide} {components} />

<button on:click={prevPage}> - </button>
<button on:click={nextPage}> + </button>
