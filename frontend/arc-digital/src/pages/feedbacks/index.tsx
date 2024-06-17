import React from 'react';
import { observer } from 'mobx-react';
import { withBanner } from '../../hoc/withBanner';
import store from '../../store';
import { Box, Container, Card, CardContent, Typography, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import RatingFaces from '../../components/rating';

function Feedbacks() {
    const { getFeedbacks, data, isLoading } = store
    const { feedbacks: isFeedbackLoading } = isLoading
    const { feedbacks } = data

    React.useEffect(() => {
        getFeedbacks()
    }, [])


    return (
        <Container sx={{ pt: 2, pb: 2 }}>
            {isFeedbackLoading ? <CircularProgress color="inherit" size={24} /> :
                <>
                    <Typography gutterBottom variant="h6" component="div">
                        Total Feedbacks: {feedbacks?.length}
                    </Typography>
                    <Grid container spacing={2}>
                        {feedbacks && feedbacks?.map((f: any) => <Grid key={f.id} item sm={4} md={4}>
                            <Card elevation={4} sx={{ height: '100%' }}>
                                <CardContent sx={{ pb: '4px !important' }}>
                                    <Typography variant="h6" component="div">
                                        {f.feedback_by.name}({f.feedback_by.user_id})&nbsp;
                                        <Typography variant="h6" component="span" color={'green'}>
                                            - {f.feedback_by.branch}
                                        </Typography>
                                    </Typography>
                                    <Typography component="div" color={'grey'}>
                                        {f.feedback_by.username}
                                    </Typography>
                                    <Box>
                                        <RatingFaces
                                            readOnly
                                            rating={f.rating} setRating={() => { }} />
                                    </Box>
                                    <Typography variant='body1' component="div" color={'purple'} sx={{ mt: 3 }}>
                                        Comment:
                                    </Typography>
                                    <Typography gutterBottom variant='body2' component="span">{f.comment ?? 'NA'}</Typography>
                                    <Typography color={'cornflowerblue'} textAlign={'right'}>
                                        {new Date(f.added_at).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>)}
                    </Grid>
                </>
            }
        </Container>
    );
}

export default withBanner(observer(Feedbacks));
