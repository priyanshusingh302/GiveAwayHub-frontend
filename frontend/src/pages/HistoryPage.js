import { Box, List, ListItem, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";

var numberList = [1, 2, 3, 4, 5];

const MyCard = ({ item }) => {

    return (
        <>
            <Paper elevation={2}>
                <div style={{ width: 460, height: 80 }}>
                    {item}
                </div>
            </Paper>
        </>
    )
};

const HistoryPage = () => {

    return (<>
        <Container sx={{ minHeight: "90vh", mt: 1, display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center" }}>
            <Box width={1000} mb={1} mt={1}>
                <Typography
                    fontSize={36}
                >
                    Histroy
                </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box border={1} borderColor="#dddddd" height="70vh" width={500} mr={5} boxShadow={2} borderRadius="10px">
                    <Typography
                        bgcolor="#d1d1d1"
                        borderRadius="10px 10px 0 0"
                        align="center"
                        fontSize={26}
                        fontWeight="bold"
                        fontFamily='monospace'
                    >
                        Gave Away
                    </Typography>
                    <List style={{ maxHeight: '90%', overflow: 'auto' }} >
                        {numberList.map(item =>
                        (
                            <ListItem>
                                <MyCard item={item} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box border={1} borderColor="#dddddd" height="70vh" width={500} boxShadow={2} borderRadius="10px">
                    <Typography
                        bgcolor="#d1d1d1"
                        borderRadius="10px 10px 0 0"
                        align="center"
                        fontSize={26}
                        fontWeight="bold"
                        fontFamily='monospace'
                    >
                        Taken
                    </Typography>
                    <List style={{ maxHeight: '90%', overflow: 'auto' }}>
                        {numberList.map(item =>
                        (
                            <ListItem>
                                <MyCard item={item} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Container>
    </>
    )
}

export default HistoryPage;