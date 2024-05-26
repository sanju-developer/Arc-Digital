import React from 'react';
import { observer } from 'mobx-react';
import { Button, Typography, Grid, Card, CardActionArea, Box, CardContent, CircularProgress } from '@mui/material';

import { FruitsStationaryProps } from './../commons/types';
import { cardBoxShadow, opacity } from '../../styles';
import Store from '../../store';


function Stationary(props: FruitsStationaryProps) {
    const { masterData, handleCardClick, update } = props
    const { isLoading } = Store
    const { masterStationaryList: isMasterStationaryListLoading, updateInventory: isLoadingUpdateInventory } = isLoading


    return (
        <>
            {isMasterStationaryListLoading && <CircularProgress color="inherit" />}
            <Grid container spacing={2} textAlign="center" mt={4}>
                {masterData.stationary?.length > 0 && masterData.stationary.map((msl) => <Grid key={msl.id} item xl={3} md={3} sm={3} >
                    <Card sx={{ mr: 2, mb: 2, boxShadow: cardBoxShadow, opacity: !msl.isAvailable ? opacity : 1 }}>
                        <Box sx={{ fontSize: 48, pt: 2 }}>{msl.icon}</Box>
                        <CardContent sx={{ pt: 0 }}>
                            <Typography gutterBottom variant="body2" component="div">
                                {msl.name}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Box>
                        <Button variant="outlined" sx={{ width: '50%' }} onClick={() => handleCardClick('stationary', msl.id)}>
                            +
                        </Button>
                        <Button variant="outlined" sx={{ width: '50%' }} onClick={() => handleCardClick('stationary', msl.id)}>
                            -
                        </Button>
                    </Box>
                </Grid>)}
            </Grid>
            {masterData.stationary.length === 0 && <Typography variant="h2" component="p">
                No Stationary Available
            </Typography>}
            <Button variant="outlined" onClick={() => update('stationary')} sx={{ mt: 2 }} disabled={isLoadingUpdateInventory}>
                {isLoadingUpdateInventory ? <Typography>Adding... <CircularProgress color="inherit" size={16} /></Typography> : 'Add'}
            </Button>
        </>
    );
}

export default observer(Stationary);
