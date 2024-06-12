import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';

import { withBanner } from '../../hoc/withBanner';
import Store from '../../store';
import Fruits from './fruits';
import Stationary from './stationary';
import Save from './save';
import { Masterdata } from './types';

function UserInventory() {
    const { getCategories, getMasterFruitList, getMasterStationaryList, data, selectedUser } = Store
    const { masterStationaryList = [], masterFruitList = [] } = data
    const [masterData, setMasterData] = useState<Masterdata>({ fruits: [], stationary: [] })
    const [category, setCategory] = React.useState('fruits');

    useEffect(() => {
        getCategories()
        getMasterStationaryList()
        getMasterFruitList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (masterFruitList.length > 0 && masterStationaryList.length > 0)
            defaultMasterData()
    }, [masterFruitList, masterStationaryList, selectedUser])

    const handleCardClick = (type: string, id: string) => {
        setMasterData((prevState) => ({
            ...prevState,
            fruits: masterData.fruits.map((f) => f.id === id ? ({ ...f, taken: !f.taken }) : f),
            stationary: masterData.stationary.map((m) => m.id === id ? ({ ...m, taken: !m.taken }) : m)
        }))
    }

    const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory((event.target as HTMLInputElement).value);
        defaultMasterData()
    }

    const defaultMasterData = () => {
        setMasterData((prevState) => ({
            ...prevState,
            fruits: !selectedUser?.isAdmin ? masterFruitList.filter((f: { isAvailable: any; }) => f.isAvailable) : masterFruitList.map((f: any) => ({ ...f, taken: false })),
            stationary: !selectedUser?.isAdmin ? masterStationaryList.filter((f: { isAvailable: any; }) => f.isAvailable) : masterStationaryList.map((f: any) => ({ ...f, taken: false })),
        }))
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
                        <Fruits masterData={masterData} handleCardClick={handleCardClick} />
                    }
                    {category === 'stationary' &&
                        <Stationary masterData={masterData} handleCardClick={handleCardClick} />
                    }
                </Grid>
            </Grid>
            <Save masterData={masterData} type={category} />
        </Container>
    );
}

export default withBanner(observer(UserInventory));
