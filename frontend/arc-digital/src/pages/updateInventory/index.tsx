import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';


import { withBanner } from '../../hoc/withBanner';
import Stationary from './stationary';
import Fruits from './fruits';
import Store from '../../store';

interface Masterdata { fruits: Record<string, any>[], stationary: Record<string, any>[] }
interface DataListMap { id: string; name: any; icon: any; isAvailable: any; last_updated_by: { user_id: any; }; }

function UpdateInventory() {
    const { getCategories, getMasterFruitList, getMasterStationaryList, updateInventory, data, selectedUser } = Store
    const { masterStationaryList = [], masterFruitList = [] } = data
    const [masterData, setMasterData] = useState<Masterdata>({ fruits: [], stationary: [] })

    useEffect(() => {
        getCategories()
        getMasterStationaryList()
        getMasterFruitList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (masterFruitList.length > 0 && masterStationaryList.length > 0)
            setMasterData((prevState) => ({
                ...prevState,
                fruits: !selectedUser?.isAdmin ? masterFruitList.filter((f: { isAvailable: boolean; }) => f.isAvailable) : masterFruitList.map((f: DataListMap) => ({ id: f.id, name: f.name, icon: f.icon, isAvailable: f.isAvailable, last_updated_by: f.last_updated_by.user_id })),
                stationary: !selectedUser?.isAdmin ? masterStationaryList.filter((f: { isAvailable: boolean; }) => f.isAvailable) : masterStationaryList.map((f: DataListMap) => ({ id: f.id, name: f.name, icon: f.icon, isAvailable: f.isAvailable, last_updated_by: f.last_updated_by.user_id }))
            }))
    }, [masterFruitList, masterStationaryList, selectedUser])

    const handleCardClick = (type: string, id: string) => {
        setMasterData((prevState) => ({
            ...prevState,
            fruits: prevState.fruits.map((f) => f.id === id ? ({ ...f, isAvailable: !f.isAvailable, last_updated_by: selectedUser?.user_id }) : f),
            stationary: prevState.stationary.map((f) => f.id === id ? ({ ...f, isAvailable: !f.isAvailable, last_updated_by: selectedUser?.user_id }) : f),
        }))
    }

    const update = (type: string) => {
        if (type === 'fruits') {
            const fruitsPayload = masterData.fruits.map((f) => ({ name: f.name, isAvailable: f.isAvailable, last_updated_by: f.last_updated_by }))
            updateInventory(fruitsPayload, 'update_fruits_availability')
            return
        }
        const stationaryPayload = masterData.stationary.map((f) => ({ name: f.name, isAvailable: f.isAvailable, last_updated_by: f.last_updated_by }))
        updateInventory(stationaryPayload, 'update_stationary_availability')
    }

    console.log(masterData, '**masterData**')
    return (
        <Container>
            <Grid container spacing={4} columnSpacing={12} textAlign="center">
                <Grid item xl={6} md={6} sm={6} >
                    <Fruits masterData={masterData} handleCardClick={handleCardClick} update={update} />
                </Grid>
                <Grid item xl={6} md={6} sm={6} textAlign="center">
                    <Stationary masterData={masterData} handleCardClick={handleCardClick} update={update} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default withBanner(observer(UpdateInventory));
