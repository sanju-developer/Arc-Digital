import React from 'react';
import { observer } from 'mobx-react';
import { withBanner } from '../../hoc/withBanner';
import store from '../../store';
import { Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function Feedbacks() {
    const { getFeedbacks, data, isLoading } = store
    const { feedbacks: isFeedbackLoading } = isLoading
    const { feedbacks } = data

    React.useEffect(() => {
        getFeedbacks()
    }, [])

    return (
        <Container>
            {isFeedbackLoading && <CircularProgress color="inherit" size={24} />}

        </Container>
    );
}

export default withBanner(observer(Feedbacks));
