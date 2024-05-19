import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import dayjs from 'dayjs';

import { Grid, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';

import { withBanner } from '../../hoc/withBanner';
import Store from '../../store';
import Fruits from './fruits';
import Stationary from './stationary';
import DateTimePickerValue from '../../components/dateTimePicker';

interface Masterdata { fruits: Record<string, any>[], stationary: Record<string, any>[] }


function UserInventory() {
    const { getCategories, getMasterFruitList, getMasterStationaryList, updateInventory, data, selectedUser } = Store
    const { masterStationaryList = [], masterFruitList = [] } = data
    const [masterData, setMasterData] = useState<Masterdata>({ fruits: [], stationary: [] })
    const [category, setCategory] = React.useState('fruits');
    const [addInventory, setAddInventory] = useState({ date: dayjs() })
    // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

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
                fruits: !selectedUser?.isAdmin ? masterFruitList.filter((f: { isAvailable: any; }) => f.isAvailable) : masterFruitList,
                stationary: !selectedUser?.isAdmin ? masterStationaryList.filter((f: { isAvailable: any; }) => f.isAvailable) : masterStationaryList
            }))
    }, [masterFruitList, masterStationaryList, selectedUser])

    const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory((event.target as HTMLInputElement).value);
    };

    const handleCardClick = (type: string, id: string) => {
        setMasterData((prevState) => ({
            ...prevState,
            fruits: prevState.fruits.map((f) => f.id === id ? ({ ...f, isAvailable: !f.isAvailable }) : f),
            stationary: prevState.stationary.map((f) => f.id === id ? ({ ...f, isAvailable: !f.isAvailable }) : f),
        }))
    }
    const update = (type: string) => {
        const fruits = masterData.fruits.filter((f) => f.isAvailable)
        const stationary = masterData.stationary.filter((f) => f.isAvailable)
        if (type === 'fruits') {
            const fruitsPayload = fruits.map((f) => ({ name: f.name, isAvailable: f.isAvailable }))
            updateInventory(fruitsPayload, 'update_fruits_order')
            return
        }
        const stationaryPayload = stationary.map((f) => ({ name: f.name, isAvailable: f.isAvailable }))
        updateInventory(stationaryPayload, 'update_stationary_order')


    }

    return (
        <Container>
            <Grid container textAlign="center">
                {!selectedUser?.isAdmin && <Grid item xl={12} md={12} sm={12} mt={2}><FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={category}
                        onChange={handleCategory}
                    >
                        <FormControlLabel value="fruits" control={<Radio />} label="Fruits" />
                        <FormControlLabel value="stationary" control={<Radio />} label="Stationary" />
                    </RadioGroup>
                </FormControl></Grid>}
                <Grid item xl={12} md={12} sm={12} >
                    {category === 'fruits' &&
                        <Fruits masterData={masterData} handleCardClick={handleCardClick} update={update} />
                    }
                    {category === 'stationary' &&
                        <Stationary masterData={masterData} handleCardClick={handleCardClick} update={update} />
                    }
                    <Container>
                        {/* <DateTimePickerValue /> */}
                    </Container>
                </Grid>
            </Grid>
        </Container>
    );
}

export default withBanner(observer(UserInventory));
