import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CardContent, Typography, Card, SxProps } from '@mui/material';

interface CustomCardsProps {
	title: string;
	description: string;
	routetoNavigate: string;
	sx: SxProps;
	icon: React.ReactNode;
	id: string;
}

function CustomCards(props: CustomCardsProps) {
	const { title, description, routetoNavigate, icon, id, sx } = props;
	const navigate = useNavigate();
	return (
		<Card id={id} sx={sx} onClick={() => navigate(routetoNavigate)}>
			<CardContent sx={{ textAlign: 'left' }}>
				<Typography variant="h4" gutterBottom>
					{title} {icon}
				</Typography>
				<Typography variant="body2" gutterBottom sx={{ pt: 6 }}>
					{description}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default CustomCards;
