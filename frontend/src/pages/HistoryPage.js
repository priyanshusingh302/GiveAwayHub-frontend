import { Box, CircularProgress, Grid, List, ListItem, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../helpers/AuthContext";
import { request } from "../helpers/axios_helper";


const MyCard = ({ item }) => {

    return (
        <>
            <Paper elevation={2}>
                <Box width={440} minHeight={55} p={1} pl={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={7}>
                            <b>Name:</b> {item.name}
                        </Grid>
                        <Grid item xs={5}>
                            <b>Age:</b> {item.yearOfUse}
                        </Grid>
                        <Grid item xs={7}>
                            <b>Category:</b> {item.category}
                        </Grid>
                        <Grid item xs={5}>
                            <b>Conditon:</b> {item.condition}
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </>
    )
};

const HistoryPage = () => {
    const [loading, setLoading] = useState(true);
    const [gave, setGave] = useState([]);
    const [taken, setTaken] = useState([]);
    const authState = useContext(AuthContext).state;

    const getData = async () => {
        setLoading(true);
        if (authState.isLoggedIn) {
            const response = await request("get", `/log/${authState.data.id}`, null);
            if (response.success) {
                console.log(response.data);
                setGave(response.data.gave);
                setTaken(response.data.taken);
                setLoading(false);
            }
            else {
                console.log("API error!");
            }
        }
    }

    useEffect(() => {
        getData();
    }, [authState])

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
                        Given
                    </Typography>
                    {!loading ? <List style={{ maxHeight: '88%', overflow: 'auto' }} >
                        {gave.map(item =>
                        (
                            <ListItem key={item.id}>
                                <MyCard item={item} />
                            </ListItem>
                        ))}
                    </List> : <Box height="60vh" width={500} sx={{ display: 'flex', alignContent: "center", alignItems: "center", pl: 28 }}>
                        <CircularProgress />
                    </Box>
                    }
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
                    {!loading ? <List style={{ maxHeight: '88%', overflow: 'auto' }}>
                        {taken.map(item =>
                        (
                            <ListItem key={item.id}>
                                <MyCard item={item} />
                            </ListItem>
                        ))}
                    </List> : <Box height="60vh" width={500} sx={{ display: 'flex', alignContent: "center", alignItems: "center", pl: 28 }}>
                        <CircularProgress />
                    </Box>
                    }
                </Box>
            </Box>
        </Container>
    </>
    )
}

export default HistoryPage;