import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../helpers/AuthContext';
import { removeAuthToken } from '../helpers/axios_helper';


function AuthNavBar() {
    const setState = React.useContext(AuthContext).setState;
    const navigate = useNavigate();

    const handleSignOut = () => {
        const temp = {
            isLoggedIn: false,
            data: {}
        };
        setState(temp);
        removeAuthToken();
        navigate('/login');
    };


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        GiveAwayHub
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button color="inherit">
                            <Link to="/items" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Products
                            </Link>
                        </Button>
                    </Box>

                    <Button color="inherit" onClick={handleSignOut}>
                        SignOut
                    </Button>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton sx={{ p: 0, marginLeft: 1, marginRight: 1 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default AuthNavBar;