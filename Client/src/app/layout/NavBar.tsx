import { Group } from '@mui/icons-material';
import { Box, AppBar, Toolbar, Typography, Container, MenuItem, LinearProgress } from '@mui/material';
import { NavLink } from 'react-router'; // fixed import from 'react-router' to 'react-router-dom'
import MenuItemLink from '../shared/components/MenuItemLink';
import { uiStore } from '../../lib/stores/uiStore';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../../lib/stores/store'; // assuming useStore is defined here

function NavBar() {
    const { uiStore } = useStore(); // fixed destructuring syntax
    return (
        <Box sx={{ flexGrow: 1 }}> {/* fixed < to <Box */}
            <AppBar
                position="static"
                sx={{
                    backgroundImage:
                        'linear-gradient(135deg,  #182a73 0%,  #218aae 69% , #20a7ac 89%)',
                    position: 'relative',
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}> {/* fixed typo 'dispaly' */}
                        <Box>
                            <MenuItem component={NavLink} to="/" sx={{ display: 'flex', gap: 2 }}>
                                <Group fontSize="large" />
                                <Typography variant="h4" fontWeight="bold">
                                    Reactivities
                                </Typography>
                            </MenuItem>
                        </Box>

                        <Box sx={{ display: 'flex' }}>
                            <MenuItemLink to="/activities">Activities</MenuItemLink>
                            <MenuItemLink to="/createActivity">Create Activity</MenuItemLink>
                        </Box>

                        <MenuItem>User Menu</MenuItem>
                    </Toolbar>
                </Container>

                <Observer>
                    {() =>
                        uiStore.isLoading ? (
                            <LinearProgress
                                color="secondary"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: 4,
                                }}
                            />
                        ) : null
                    }
                </Observer>
            </AppBar>
        </Box>
    );
}

export default NavBar;
