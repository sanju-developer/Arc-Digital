import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import Store from './store';
import './App.css';
import Feedback from './pages/pages/feedback';

function App() {
	const { getUsers, setSelectedUser, selectedUser, data } = Store;
	const { users, isLoading } = data;

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
				options={users}
				getOptionLabel={(option: any) => `${option.id}-${option.name}`}
				loading={isLoading}
				renderInput={(params) => <TextField {...params} label="Please enter user id" />}
				onChange={(_, value) => setSelectedUser(value)}
			/>
			<Typography variant="h3" gutterBottom>
				Your Feedback's are valuable to us!!
			</Typography>
			<Feedback />
		</Container>
	);
}

export default observer(App);
