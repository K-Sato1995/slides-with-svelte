import { data } from '$lib/data/slides.json';

type SlideParams = {
	params: {
		num: number;
		id: string;
	};
};

export async function get({ params }: SlideParams) {
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
