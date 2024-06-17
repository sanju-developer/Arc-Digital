import React from 'react';
import { observer } from 'mobx-react';
import { withBanner } from '../../hoc/withBanner';
import store from '../../store';
import { Container, Card, CardContent, Typography, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function Orders() {
    const { getOrders, data, isLoading } = store
    const { orders: isOrderLoading } = isLoading
    const { orders } = data

    React.useEffect(() => {
        getOrders()
    }, [])

    console.log(orders && JSON.parse(JSON.stringify(orders)), 'orders')
    return (
        <Container sx={{ pt: 2, pb: 2 }}>
            {isOrderLoading ? <CircularProgress color="inherit" size={24} /> : <>
                <Typography gutterBottom variant="h6" component="div">
                    Total orders: {orders?.length}
                </Typography>
                <Grid container spacing={2}>
                    {orders && orders?.map((o: any) => <Grid key={o.oid} item sm={4} md={4}>
                        <Card elevation={4} sx={{ height: '100%' }}>
                            <CardContent sx={{ pb: '4px !important' }}>
                                <Typography variant="h6" component="div">
                                    {o.ordered_by.name}({o.ordered_by.user_id})&nbsp;
                                    <Typography variant="h6" component="span" color={'green'}>
                                        - {o.ordered_by.branch}
                                    </Typography>
                                </Typography>
                                <Typography component="div" color={'grey'}>
                                    {o.ordered_by.username}
                                </Typography>
                                <Typography variant='body1' component="div" color={'purple'} sx={{ mt: 3 }}>
                                    Ordered Items:
                                </Typography>
                                {o.items.map((i: { id: string; name: string }) => <Typography key={i.id} gutterBottom variant='body2' component="span">{i.name},&nbsp;</Typography>)}
                                <Typography variant='body1' component="div" color={'purple'} sx={{ mt: 3 }}>
                                    Comment:
                                </Typography>
                                <Typography gutterBottom variant='body2' component="span">{o.comment ?? 'NA'}</Typography>
                                <Typography gutterBottom component="div" color={'cornflowerblue'} textAlign={'right'}>
                                    {new Date(o.dateTime).toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>)}
                </Grid>
            </>}
        </Container>
    );
}

export default withBanner(observer(Orders));
