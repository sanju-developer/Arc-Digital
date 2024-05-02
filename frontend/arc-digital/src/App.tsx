import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import Store from './store';
import './App.css';

function App() {
	const { getUsers } = Store;

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<Container maxWidth="md">
			<Typography variant="h1" gutterBottom>
				Hey {}, Welcome to Arc Digital
			</Typography>
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				options={[]}
				renderInput={(params) => <TextField {...params} label="Please enter user id" />}
			/>
		</Container>
	);
}

export default observer(App);
