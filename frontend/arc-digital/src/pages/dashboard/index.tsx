import React from 'react';
import { Grid, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { observer } from 'mobx-react';

import UsersSelectBox from '../../components/users';
import Store from '../../store';
import '../../App.css';

import { userBoxStyle, customCardStyleOnDashboard } from '../../styles';
import CustomCards from '../../components/cards';
import { cardsData } from '../../constant';
import { withBanner } from '../../hoc/withBanner';

function Dashboard() {
    const { selectedUser } = Store;

    const getRoute = (route: string) => {
        if (selectedUser?.isAdmin) {
            return route
        }
        if (route === '/dashboard/updateInventory') {
            return '/dashboard/userInventory'
        }
        return route
    }

    return (
        <Container className="main-container" maxWidth="xl">
            <Grid container pt={2}>
                <Grid xs={12}>
                    {selectedUser && (
                        <Typography className="fw500" variant="h2">
                            @{selectedUser.username}
                        </Typography>
                    )}
                    <Typography className="welcome-title fw500" variant="h2" gutterBottom>
                        Welcome to Arc Digital 🚀
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={userBoxStyle}>
                <UsersSelectBox />
            </Box>
            {selectedUser && <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 12
                }}
            >
                {cardsData.map((card) => (
                    <CustomCards
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        routetoNavigate={getRoute(card.route)}
                        icon={card.icon}
                        sx={{
                            ...customCardStyleOnDashboard,
                            background: card.color,
                            border: '1px solid #000'
                        }}
                    />
                ))}
            </Box>}
        </Container>
    );
}

export default withBanner(observer(Dashboard));
