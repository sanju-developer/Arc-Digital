import React, { useState } from 'react';
import { observer } from 'mobx-react';

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Store from '../../../store';

import { Button, Autocomplete, TextField } from '@mui/material';
import RatingFaces from '../../../components/rating';

function Feedback() {
	const { addFeedback, selectedUser } = Store;
	const [ feedbackForm, setfeedbackForm ] = useState({ category: '', rating: 0, comment: '' });

	const saveFeedback = () => {
		addFeedback({
			category: feedbackForm.category,
			user_id: selectedUser.id,
			rating: feedbackForm.rating,
			comment: feedbackForm.comment
		});
	};

	const setValues = (id: string, val: any) => {
		setfeedbackForm((prevState) => ({
			...prevState,
			[id]: val
		}));
	};

	console.log(feedbackForm, 'feedbackForm');

	return (
		<Container maxWidth="md">
			<FormControl sx={{ width: '25ch' }}>
				<Autocomplete
					disablePortal
					id="category"
					options={[]}
					renderInput={(params) => <TextField {...params} label="Please select category" />}
					onChange={(_, value) => setValues('category', value)}
				/>
				<RatingFaces rating={feedbackForm.rating} setRating={(val: number) => setValues('rating', val)} />
				<OutlinedInput
					id="comment"
					placeholder="Comments are always welcome!!"
					onChange={(e) => setValues('comment', e.target.value)}
				/>
			</FormControl>
			<Button onClick={saveFeedback}>Submit</Button>
		</Container>
	);
}

export default observer(Feedback);
