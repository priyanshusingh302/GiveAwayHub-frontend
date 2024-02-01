import { Box, Paper, Typography } from "@mui/material"
import axios from "axios"


export const ItemCard = ({ item }) => {


    return (
        <>
            <Paper elevation={2}>
                <Box minHeight={55} sx={{ bgcolor: "#EAEAEA", padding: 1, display: "flex" }}>
                    <Box width={215} height={215} sx={{
                        bgcolor: "white", display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 2,
                        borderColor: "#dddddd",
                        mr: 1
                    }}>
                        <img
                            style={{
                                objectFit: "fill",
                                height: 215,
                                width: 215
                            }}
                            src={`${axios.defaults.baseURL}/image/${item.id}`}
                            alt={`Item:${item.name}`}
                        />
                    </Box>
                    <Box>
                        <Typography
                            variant="h6"
                            fontFamily={"unset"}
                        >
                            {item.name}
                        </Typography>
                        <Typography
                            variant="h7"
                            fontFamily={"unset"}
                        >
                            Category: <i>{item.category}</i>
                        </Typography>
                        <br />
                        <Typography
                            variant="h7"
                            fontFamily={"unset"}
                        >
                            Condition: <i>{item.condition}</i>
                        </Typography>
                        <br />
                        <Typography
                            fontSize={12}
                            fontFamily={"unset"}
                        >
                            {item.description}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </>
    )
}