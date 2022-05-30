<script lang="ts">
	import Markdoc, { Tag } from '@markdoc/markdoc';
	import SvelteButton from '$lib/components/SvelteButton.svelte';
	import SvelteRenderer from '$lib/svelteRenderer.svelte';

	interface SlidePage {
		[id: number]: Tag[];
	}

	const doc = `
# Heading1 this is title

Markdoc is a Markdown-based syntax and toolchain for creating custom documentation sites. Stripe created Markdoc to power [our public docs](http://stripe.com/docs).

\`\`\`ts
content.children.map((child) => {
    if (child.name === 'h1') {
        nodeCounter += 1;
        pages[nodeCounter] = [child];
    } else {
        pages[nodeCounter].push(child);
    }
});
\`\`\`


{% btn type="check" %}
Markdoc is open-source—check out its [source](http://github.com/markdoc/markdoc) to see how it works.
{% /btn %}

# How is Markdoc different?

Markdoc uses a fully declarative approach to composition and flow control, where other solutions… [Read more](/docs/overview).


# Next steps
- [Install Markdoc](/docs/getting-started)
- [Explore the syntax](/docs/syntax)
    `;

	const config = {
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

	const ast = Markdoc.parse(doc);
	const content = Markdoc.transform(ast, config) as Tag;

	let pages: SlidePage = { 0: [] };
	let nodeCounter = 0;

	content.children.map((child) => {
		if (child.name === 'h1') {
			nodeCounter += 1;
			pages[nodeCounter] = [child];
		} else {
			pages[nodeCounter].push(child);
		}
	});

	const components = new Map([['btn', SvelteButton]]);
	let pageCounter = 1;

	const nextPage = () => {
		pageCounter += 1;
	};

	const prevPage = () => {
		pageCounter -= 1;
	};
</script>

<SvelteRenderer children={pages[pageCounter]} {components} />

<button on:click={prevPage}> - </button>
<button on:click={nextPage}> + </button>
