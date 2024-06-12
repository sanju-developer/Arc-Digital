import React from 'react';
import { observer } from 'mobx-react';
import { Typography, Grid, Card, CardActionArea, Box, CardContent, CircularProgress } from '@mui/material';

import { FruitsStationaryProps } from './../commons/types';
import { cardBoxShadow } from '../../styles';
import Store from '../../store';


function Stationary(props: FruitsStationaryProps) {
    const { masterData, handleCardClick } = props
    const { isLoading } = Store
    const { masterStationaryList: isMasterStationaryListLoading } = isLoading


    return (
        <>
            {isMasterStationaryListLoading && <CircularProgress color="inherit" />}
            <Grid container spacing={2} textAlign="center" mt={4}>
                {masterData.stationary?.length > 0 && masterData.stationary.map((msl) => <Grid key={msl.id} item xl={3} md={3} sm={3} >
                    <Card sx={{ mr: 2, mb: 2, boxShadow: cardBoxShadow, border: msl.taken ? '1px solid green' : 'none' }} >
                        <CardActionArea onClick={() => handleCardClick('stationary', msl.id)}>
                            <Box sx={{ fontSize: 48, pt: 2 }}>{msl.icon}</Box>
                            <CardContent sx={{ pt: 0 }}>
                                <Typography gutterBottom variant="body2" component="div">
                                    {msl.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>)}
            </Grid>
            {masterData.stationary.length === 0 && <Typography variant="h2" component="p">
                No Stationary Available
            </Typography>}
        </>
    );
}

export default observer(Stationary);
