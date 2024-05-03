import React from 'react';
import { Rating } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';
import { customStyles } from './constants';

interface RatingFacesProps {
	rating: number;
	setRating: (val: number) => void;
}

export default function RatingFaces(props: RatingFacesProps) {
	const { rating = 0, setRating } = props;

	return (
		<Rating
			style={{ maxWidth: 300 }}
			value={rating}
			onChange={setRating}
			itemStyles={customStyles}
			items={4}
			highlightOnlySelected
			spaceBetween="medium"
			transition="zoom"
		/>
	);
}
