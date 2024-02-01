import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';


function NavBar() {

  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <button style={{
            color: "white",
            backgroundColor: "transparent",
            backgroundRepeat: "no-repeat",
            border: "none",
            cursor: "pointer",
            overflow: "hidden"
          }}
            onClick={() => (navigate("/items"))}
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
                Market
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