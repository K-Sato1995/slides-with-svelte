---
title: Blog Template with Sveltekit
---

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
