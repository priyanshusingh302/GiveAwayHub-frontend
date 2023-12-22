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
    const authState = React.useContext(AuthContext).state;
    const navigate = useNavigate();

    const handleSignOut = () => {
        const temp = {
            isLoggedIn: false,
            data: {}
        };
        setState(temp);
        removeAuthToken();
        localStorage.removeItem('user');
        navigate('/login');
    };


    return (
        <AppBar position="static" >
            <Container maxWidth="xl" >
                <Toolbar disableGutters  >
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <button style={{
                        color: "white",
                        backgroundColor: "transparent",
                        backgroundRepeat: "no-repeat",
                        border: "none",
                        cursor: "pointer",
                        overflow: "hidden"
                    }}
                        onClick={() => (navigate("/home"))}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
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
                    </button>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button color="inherit">
                            <Link to="/items" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Products
                            </Link>
                        </Button>
                    </Box>

                    <Button color="inherit" >
                        <Link to="/history" style={{ textDecoration: 'none', color: 'inherit' }}>
                            History
                        </Link>
                    </Button>
                    <Button color="inherit" onClick={handleSignOut}>
                        SignOut
                    </Button>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Profile" >
                            <IconButton sx={{ p: 0, marginLeft: 1, marginRight: 1 }} onClick={() => (navigate('/profile'))}>
                                <Avatar alt={authState.data.firstName} src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default AuthNavBar;