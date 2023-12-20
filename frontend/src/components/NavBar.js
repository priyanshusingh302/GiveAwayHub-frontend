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
import { Link } from 'react-router-dom';


function NavBar() {


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

          <Button color="inherit">
            <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
              Signup
            </Link>
          </Button>
          
          <Button color="inherit">
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              Login
            </Link>
          </Button>

        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default NavBar;