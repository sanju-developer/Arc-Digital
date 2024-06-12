import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router';

import { Alert, Typography, Grid, Box, Tooltip, MenuItem, Menu, ListItemText, Button } from '@mui/material';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

import { clearLocalStorage, getLocalstorage, upperCaseFirstLetter } from '../../utils';
import { nameWithIconStyle } from '../../styles';
import Store from '../../store';
import './index.css';

function Banner() {
	const { selectedUser, setSelectedUser } = Store;
	const [user, setUser] = useState(selectedUser)
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	useEffect(() => {
		if (!selectedUser) {
			const userData = getLocalstorage('user')
			if (userData) {
				setUser(JSON.parse(userData))
				setSelectedUser(JSON.parse(userData))
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (selectedUser)
			setUser(selectedUser)
	}, [selectedUser])

	const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const logout = () => {
		clearLocalStorage('user')
		setSelectedUser(null)
		navigate('/')
	}

	return (
		<Alert icon={false} severity="info">
			<Grid container>
				<Grid item md={3} xl={3} sm={3}>
					<Box sx={nameWithIconStyle}>
						{user && <> <VerifiedUserOutlinedIcon fontSize="small" />
							<Typography pl={0.5}> {upperCaseFirstLetter(user.name)} </Typography> </>}
					</Box>
				</Grid>
				<Grid item md={6} xl={6} sm={6} textAlign="center">
					<Typography>Application is in beta phase, your enggagement would be helpful!! ❤️</Typography>
				</Grid>
				<Grid item md={3} xl={3} sm={3} >
					{user && <Box textAlign="right">
						<Tooltip title="Admin">
							<Button
								onClick={handleClick}
								size="medium"
								variant='text'
								sx={{ ml: 2, p: 0 }}
								aria-controls={open ? 'admin-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
							>
								Menu
							</Button>
						</Tooltip>
					</Box>}
				</Grid>
			</Grid>
			<Menu
				anchorEl={anchorEl}
				id="admin-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&::before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{user && user.isAdmin && <><MenuItem onClick={() => navigate('/dashboard/updateInventory')}>
					<ListItemText>Update Inventory</ListItemText>
				</MenuItem>
					<MenuItem onClick={() => navigate('/dashboard/feedbacks')}>
						<ListItemText>Feedbacks</ListItemText>
					</MenuItem>
					<MenuItem onClick={() => navigate('/dashboard/orders')}>
						<ListItemText>Orders</ListItemText>
					</MenuItem>
				</>}
				<MenuItem onClick={logout}>
					<ListItemText>Logout</ListItemText>
				</MenuItem>
			</Menu>
		</Alert>
	);
}

export default observer(Banner);
