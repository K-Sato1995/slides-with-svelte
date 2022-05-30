import glob from 'glob';
import path from 'path';
import * as fs from 'fs';
import Markdoc from '@markdoc/markdoc';
import markdocConfig from '../config/markdoc.js';
import metadataParser from 'markdown-yaml-metadata-parser';

const __dirname = path.resolve();
const contentPath = path.join(__dirname, 'src/content');
const outputPath = path.join(__dirname, 'src/lib/data/slides.json');

const getMDFiles = (path) => {
	return glob.sync(path + '/**/*.md');
};

const ppJSON = (obj) => {
	return JSON.stringify(obj, null, 2);
};

const writeJSON = (outputPath, jsonObj) => {
	fs.writeFile(outputPath, ppJSON(jsonObj), (err) => {
		if (err) throw err;
	});
};

const generateIdFromTitle = (title) => {
	const lowercased = title.toLowerCase();
	return lowercased.split(' ').join('-');
};

const buildSlide = (doc) => {
	let pages = [];
	let nodeCounter = 0;

	const ast = Markdoc.parse(doc);
	const content = Markdoc.transform(ast, markdocConfig);

	content.children.map((child) => {
		// console.log(nodeCounter);
		// console.log(pages);
		if (child.name === 'h1') {
			pages.push([child]);
			nodeCounter += 1;
		} else {
			pages[nodeCounter - 1].push(child);
		}
	});

	return pages;
};

const slideFiles = getMDFiles(contentPath);

let data = [];

for (let i = 0; i < slideFiles.length; i++) {
	const mdFile = slideFiles[i];
	const mdText = fs.readFileSync(mdFile).toString();
	const pages = buildSlide(mdText);
	const metaData = metadataParser(mdText);

	data.push({
		id: generateIdFromTitle(metaData.metadata.title),
		title: metaData.metadata.title,
		slides: pages
	});
}

writeJSON(outputPath, { data: data });
