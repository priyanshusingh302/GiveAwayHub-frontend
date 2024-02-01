
import { Box, Card, CardActionArea, Dialog, styled, Typography } from "@mui/material"
import axios from "axios"
import Button from '@mui/material/Button';
import { useState } from "react";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const ItemCard = ({ item }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card>
                <CardActionArea onClick={handleClickOpen}>
                    <Box minHeight={55} sx={{ bgcolor: "#EAEAEA", padding: 1, display: "flex" }} >
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
                            <br /><Typography
                                variant="h7"
                                fontFamily={"unset"}
                            >
                                Used for <b>{item.yearOfUse}</b> Year
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
                </CardActionArea>
            </Card>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {item.name}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                <Box minHeight={55} sx={{ padding: 1, display: "flex" }} >
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
                            <br /><Typography
                                variant="h7"
                                fontFamily={"unset"}
                            >
                                Used for <b>{item.yearOfUse}</b> Year
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
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Take
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    )
}