<script lang="ts">
	export let slide: any;
	// import Markdoc, { Tag } from '@markdoc/markdoc';
	// import SvelteButton from '$lib/components/SvelteButton.svelte';
	import { components } from '/Users/satokatsuki/WorkSpace/Svelte/slides-with-sveltekit/src/config/markdoc.js';
	import SvelteRenderer from '$lib/svelteRenderer.svelte';

	// interface SlidePage {
	// 	[id: number]: Tag[];
	// }
	// let pageCounter = 1;

	// const nextPage = () => {
	// 	pageCounter += 1;
	// };

	// const prevPage = () => {
	// 	pageCounter -= 1;
	// };
</script>

<SvelteRenderer children={slide} {components} />

<!-- <button on:click={prevPage}> - </button>
<button on:click={nextPage}> + </button> -->
