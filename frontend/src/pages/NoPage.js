import { Button, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";

const NoPage = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '90vh'
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2} >
                    <Grid xs={6} sx={{pt:5}}>
                        <Typography
                            variant="h1"
                            sx={{ fontFamily: 'sans-serif' }}
                        >
                            404
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{ fontFamily: 'sans-serif' }}
                        >
                            The page you’re looking for doesn’t exist.
                        </Typography>
                        <Button sx={{ mt: 1 }} variant="outlined" onClick={() => (navigate("/home"))}>
                            Back Home
                        </Button>
                    </Grid>
                    <Grid xs={6}>
                        <img
                            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                            alt=""
                            width={400} height={300}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default NoPage;