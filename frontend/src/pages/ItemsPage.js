import { Box, Stack, TextField } from "@mui/material";
import { Container } from "@mui/system";


const ItemsPage = () => {
    return (
        <Container maxWidth="xl" sx={{ minHeight: "90vh", mt: 1, display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center" }}>
            <Box sx={{ bgcolor:"#E0EAF4",borderRadius: 2, display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", mt: 2,p:1 }}>
                <Box width={"100%"} mb={1}>
                    <TextField
                        size="small"
                        fullWidth
                        title="Search"
                        label="Search"
                        sx={{bgcolor:"#F9F9FF",borderRadius:1}}
                    />
                </Box>
                <Stack direction="row" spacing={2}>
                    <TextField
                        size="small"
                        label="Category"
                        sx={{bgcolor:"#F9F9FF",borderRadius:1}}
                    />

                    <TextField
                        size="small"
                        type="number"
                        id="yearOfUse"
                        label="Year of Use"
                        name="yearOfUse"
                        sx={{bgcolor:"#F9F9FF",borderRadius:1}}
                    />

                    <TextField
                        size="small"
                        label="Condition"
                        sx={{bgcolor:"#F9F9FF",borderRadius:1}}
                    />
                </Stack>
            </Box>
        </Container>
    );
};

export default ItemsPage;