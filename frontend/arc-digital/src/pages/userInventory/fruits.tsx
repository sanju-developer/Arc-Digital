import React from 'react';
import { observer } from 'mobx-react';
import { Typography, Grid, Card, CardActionArea, Box, CardContent, CircularProgress } from '@mui/material';

import { FruitsStationaryProps } from './../commons/types';
import { cardBoxShadow } from '../../styles';
import Store from '../../store';


function Fruits(props: FruitsStationaryProps) {
    const { masterData, handleCardClick } = props
    const { isLoading } = Store
    const { masterFruitList: isMasterFruitListLoading } = isLoading

    return (<>
        {isMasterFruitListLoading && <CircularProgress color="inherit" />}
        <Grid container spacing={2} textAlign="center" mt={4}>
            {masterData.fruits?.length > 0 && masterData.fruits.map((mfl) => <Grid key={mfl.id} item xl={3} md={3} sm={3} >
                <Card sx={{ mr: 2, mb: 2, boxShadow: cardBoxShadow, border: mfl.taken ? '1px solid green' : 'none' }}>
                    <CardActionArea onClick={() => handleCardClick('fruits', mfl.id)}>
                        <Box sx={{ fontSize: 48, pt: 2 }}>{mfl.icon}</Box>
                        <CardContent sx={{ pt: 0 }}>
                            <Typography gutterBottom variant="body2" component="div">
                                {mfl.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>)}
        </Grid>
        {masterData.fruits.length === 0 && <Typography variant="h2" component="p">
            No Fruits Available
        </Typography>}
    </>
    );
}

export default observer(Fruits);
