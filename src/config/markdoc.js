import SvelteButton from '$lib/components/SvelteButton.svelte';

const markdocConfig = {
	tags: {
		btn: {
			render: 'btn',
			description: 'Display the enclosed content in a callout box',
			children: ['paragraph'],
			attributes: {
				type: {
					type: String,
					default: 'note',
					matches: ['check', 'error', 'note', 'warning']
				}
			}
		}
	}
};

export const components = new Map([['btn', SvelteButton]]);

export default markdocConfig;
