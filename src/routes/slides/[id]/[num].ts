import { data } from '$lib/data/slides.json';

export async function get({ params }) {
	const id = params.id;
	const slideNum = params.num;

	const slideData = data.find((slide) => slide.id == id);
	const slide = slideData?.slides[slideNum - 1];
	const maxSlideNum = slideData?.slides.length;

	if (slide) {
		return {
			body: { slide, maxSlideNum: maxSlideNum }
		};
	}

	return {
		body: { message: 'Not found', slide: null }
	};
}
