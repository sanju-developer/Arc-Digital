import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Store from '../../store';

function UsersSelectBox() {
	const { getUsers, setSelectedUser, selectedUser, data, isLoading } = Store;
	const { users = [] } = data;
	const { users: isUsersLoading } = isLoading;

	useEffect(() => {
		getUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Autocomplete
			disablePortal
			id="users"
			value={selectedUser}
			options={users}
			getOptionLabel={(option: any) => (option ? `${option.user_id}-${option.name}` : '')}
			loading={isUsersLoading}
			renderInput={(params) => <TextField {...params} label="Select your arc-id" />}
			onChange={(_, value) => setSelectedUser(value)}
		/>
	);
}

export default observer(UsersSelectBox);
