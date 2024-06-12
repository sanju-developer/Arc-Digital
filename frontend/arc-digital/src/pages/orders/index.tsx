import React from 'react';
import { observer } from 'mobx-react';
import { withBanner } from '../../hoc/withBanner';
import store from '../../store';
import { Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function Orders() {
    const { getOrders, data, isLoading } = store
    const { orders: isOrderLoading } = isLoading
    const { orders } = data

    React.useEffect(() => {
        getOrders()
    }, [])

    return (
        <Container>
            {isOrderLoading && <CircularProgress color="inherit" size={24} />}

        </Container>
    );
}

export default withBanner(observer(Orders));
