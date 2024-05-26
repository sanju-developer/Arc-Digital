import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

import { Button, Typography, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';


import feedbackImg from '../../media/feedback.png';
import RatingFaces from '../../components/rating';
import { withBanner } from '../../hoc/withBanner';
import { toastOption } from '../../constant';
import Store from '../../store';
import './index.css';

const defaultFeedbackValue = { category: 'Breakfask', rating: 0, comment: '' }
function Feedback() {
	const { addFeedback, selectedUser, isLoading } = Store;
	const { feedback: isFeedbackLoading = false } = isLoading
	const navigate = useNavigate()
	const [feedbackForm, setfeedbackForm] = useState(defaultFeedbackValue);

	const saveFeedback = async () => {
		if (!feedbackForm.rating) {
			toast.error('Please provide rating.', { ...toastOption, position: "bottom-center" });
			return;
		}
		if (selectedUser) {
			try {
				const result = await addFeedback({
					category: feedbackForm.category,
					feedback_by: selectedUser.user_id,
					rating: feedbackForm.rating,
					comment: feedbackForm.comment
				});
				setfeedbackForm(defaultFeedbackValue)
				toast.success(result, { ...toastOption, position: "bottom-center" })

			} catch (err) {
				// @ts-ignore
				toast.error(err, { ...toastOption, position: "bottom-center" })
			}
		}
	};

	const setValues = (id: string, val: any) => setfeedbackForm((prevState) => ({
		...prevState,
		[id]: val
	}));

	const gotoHome = () => navigate('/')


	return (
		<Container>
			<Grid container spacing={2} textAlign="center">
				<Grid item xl={5} md={5} sm={5} textAlign="left">
					<img src={feedbackImg} alt="feedback-pic" width="100%" />
					<ul>
						<li>
							<b>Feedback as a Secret Ingredient:</b> Feedback is what transforms a dish into a feast.
						</li>
						<li>
							<b>Importance of Feedback:</b> By giving feedback, you help us improve. It shows if we're on
							the right track.
						</li>
						<li>
							<b>Encouragement to Give Feedback:</b> Whether it's praise, criticism, or confusion, your
							feedback helps us get better.
						</li>
						<li>
							<b>Funny Angle on Feedback:</b> Without feedback, we'd never know if the printer jammed due
							to a sticky note or if it just needed a hug.
						</li>
					</ul>
				</Grid>
				<Grid item xl={7} md={7} sm={7} mt={5}>
					<Typography variant="h3" gutterBottom>
						Your feedback is valuable to us!!
					</Typography>
					<FormControl sx={{ pt: 5 }}>
						<RadioGroup
							row
							aria-labelledby="food-category"
							defaultValue="Breakfask"
							name="categories-buttons-group"
							onChange={(e) => setValues('category', e.target.value)}
						>
							<FormControlLabel value="Breakfask" control={<Radio />} label="Breakfask" />
							<FormControlLabel value="Lunch" control={<Radio />} label="Lunch" />
							<FormControlLabel value="Dinner" control={<Radio />} label="Dinner" />
						</RadioGroup>
						<RatingFaces
							rating={feedbackForm.rating}
							setRating={(val: number) => setValues('rating', val)}
						/>
						<OutlinedInput
							id="comment"
							multiline // Enables multiline textarea
							rows={4} // Number of visible rows (adjust as needed)
							placeholder="Comments/Suggestions are always welcome!!"
							value={feedbackForm.comment}
							onChange={(e) => setValues('comment', e.target.value)}
							sx={{ mt: 2 }}
						/>
						<Button variant="outlined" onClick={saveFeedback} sx={{ mt: 2 }} disabled={isFeedbackLoading}>
							{isFeedbackLoading ? <CircularProgress color="inherit" size={24} /> : 'Submit'}
						</Button>
						<Button variant="outlined" onClick={gotoHome} sx={{ mt: 2 }} disabled={isFeedbackLoading}>
							Back to home
						</Button>
					</FormControl>
				</Grid>
			</Grid>
		</Container>
	);
}

export default withBanner(observer(Feedback));
