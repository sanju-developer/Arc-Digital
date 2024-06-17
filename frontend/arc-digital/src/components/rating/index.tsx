import React from 'react';
import { Rating } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';
import { customStyles } from './constants';

interface RatingFacesProps {
	rating: number;
	setRating: (val: number) => void;
	readOnly?: boolean
}

export default function RatingFaces(props: RatingFacesProps) {
	const { rating = 0, setRating, readOnly = false } = props;

	return (
		<Rating
			style={{ maxWidth: 300 }}
			value={rating}
			onChange={setRating}
			itemStyles={customStyles}
			items={4}
			highlightOnlySelected
			transition="zoom"
			isDisabled={readOnly}
			spaceInside={'small'}
			spaceBetween={'medium'}
		/>
	);
}
