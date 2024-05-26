import React from 'react';
import { observer } from 'mobx-react';
import { Button, Typography, Grid, Card, CardActionArea, Box, CardContent, CircularProgress } from '@mui/material';

import { FruitsStationaryProps } from './../commons/types';
import { cardBoxShadow, opacity } from '../../styles';
import Store from '../../store';


function Fruits(props: FruitsStationaryProps) {
    const { masterData, handleCardClick, update } = props
    const { isLoading } = Store
    const { masterFruitList: isMasterFruitListLoading, updateInventory: isLoadingUpdateInventory } = isLoading


    return (<>
        {isMasterFruitListLoading && <CircularProgress color="inherit" />}
        <Grid container spacing={2} textAlign="center" mt={4}>
            {masterData.fruits?.length > 0 && masterData.fruits.map((mfl) => <Grid key={mfl.id} item xl={3} md={3} sm={3} >
                <Card sx={{ mr: 2, mb: 2, boxShadow: cardBoxShadow, opacity: !mfl.isAvailable ? opacity : 1 }}>
                    <Box sx={{ fontSize: 48, pt: 2 }}>{mfl.icon}</Box>
                    <CardContent sx={{ pt: 0 }}>
                        <Typography gutterBottom variant="body2" component="div">
                            {mfl.name}
                        </Typography>
                    </CardContent>
                </Card>
                <Box>
                    <Button variant="outlined" sx={{ width: '50%' }} onClick={() => handleCardClick('fruits', mfl.id)}>
                        +
                    </Button>
                    <Button variant="outlined" sx={{ width: '50%' }} onClick={() => handleCardClick('fruits', mfl.id)}>
                        -
                    </Button>
                </Box>
            </Grid>)}
        </Grid>
        {masterData.fruits.length === 0 && <Typography variant="h2" component="p">
            No Fruits Available
        </Typography>}
        <Button variant="outlined" onClick={() => update('fruits')} sx={{ mt: 2 }} disabled={isLoadingUpdateInventory}>
            {isLoadingUpdateInventory ? <Typography>Adding... <CircularProgress color="inherit" size={16} /></Typography> : 'Add'}
        </Button>
    </>
    );
}

export default observer(Fruits);
