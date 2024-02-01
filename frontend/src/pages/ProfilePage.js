
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import 'dayjs/locale/en-in';
import AuthContext from "../helpers/AuthContext";
import { getAuthToken, request } from "../helpers/axios_helper";
import { hash } from "../helpers/HashGenerator";
import axios from "axios";


const ProfilePage = () => {

    const authState = useContext(AuthContext).state;
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);

    const [form, setForm] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        address: "",
        dateOfBirth: "",
        password: "",
        re_password: ""
    });

    const getData = async () => {
        if (authState.isLoggedIn) {
            const response = await request("get", `/user/${authState.data.id}`, null);
            if (response.success) {
                setForm({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber,
                    gender: response.data.gender,
                    address: response.data.address,
                    dateOfBirth: response.data.dateOfBirth,
                    password: "",
                    re_password: ""
                });
            }
            else {
                console.log("Error!!!")
            }
            setImagePreview(`${axios.defaults.baseURL}/image/${authState.data.id}`)
        }
    }


    useEffect(() => {
        getData();
    }, [authState])

    const handleSubmit = async () => {
        const data = {
            id: authState.data.id,
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phoneNumber: form.phoneNumber,
            gender: form.gender,
            address: form.address,
            dateOfBirth: form.dateOfBirth,
            password: hash(form.password)
        }
        console.log(data);
        const response = await request("post", "/user/update", data);
        if (response.success) {
            alert("Details Updated Succesfully!!");
            return null;
        }
        else {
            alert("Error!!");
        }
    }

    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validatePassword = () => {
        return form.password === form.re_password;
    }
    const validatePhoneNumber = () => {
        return form.phoneNumber.length === 10 && !isNaN(parseFloat(form.phoneNumber)) && isFinite(form.phoneNumber);
    }
    const validateForm = () => {
        const flag = form.firstName !== "" &&
            form.lastName !== "" &&
            form.email !== "" &&
            form.phoneNumber !== "" &&
            form.address !== "" &&
            form.gender !== "" &&
            form.password !== "" &&
            form.re_password !== "" &&
            form.dateOfBirth !== "" &&
            form.firstName !== null &&
            form.lastName !== null &&
            form.email !== null &&
            form.phoneNumber !== null &&
            form.address !== null &&
            form.gender !== null &&
            form.password !== null &&
            form.re_password !== null &&
            form.dateOfBirth !== null;
        return validatePassword() && validatePhoneNumber() && flag;
    }
    const handelUpload = () => {
        if (image !== null) {
            let formData = new FormData();
            formData.append("file", image);
            formData.append("referenceId", authState.data?.id);
            axios.post(
                `${axios.defaults.baseURL}/image/upload`,
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${getAuthToken()}`,
                        "Content-type": "multipart/form-data",
                    },
                }
            )
                .then(res => {
                    console.log(`Success:` + res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }

    return (
        <>{
            authState.isLoggedIn ?
                <Container maxWidth="lg" sx={{ minHeight: "90vh", borderRadius: 1, mt: 1, p: 5, display: "flex", flexDirection: "row" }}>
                    <Box sx={{ mr: 5 }} width={300} display="flex" flexDirection="column" alignItems="center" alignContent="center" gap={2}>
                        <Box width={250} height={250} sx={{
                            bgcolor: "white", mt: 5, display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: 2,
                            borderColor: "#dddddd",
                            mb: 2
                        }}>
                            <img
                                style={{
                                    objectFit: "fill",
                                    height: 250,
                                    width: 250
                                }}
                                src={imagePreview}
                                alt="Profile"
                            />
                        </Box>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Chnage
                            <input
                                accept="image/*"
                                type="file"
                                hidden
                                onChange={(newImage) => { setImage(newImage.target.files[0]); setImagePreview(URL.createObjectURL(newImage.target.files[0])) }}
                            />
                        </Button>
                        <Button
                            variant="contained"
                            component="label"
                            onClick={handelUpload}
                        >
                            Upload
                        </Button>
                    </Box>
                    <Box width={800} display="flex" flexDirection="column" alignItems="center" gap={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    value={form.firstName}
                                    required
                                    fullWidth
                                    onChange={handleFormChange}
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    onChange={handleFormChange}
                                    value={form.lastName}
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid
                                item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    disabled
                                    onChange={handleFormChange}
                                    value={form.email}
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    value={form.phoneNumber}
                                    type="tel"
                                    onChange={handleFormChange}
                                    error={form.phoneNumber !== "" && !validatePhoneNumber()}
                                    helperText={((form.phoneNumber !== "") && !validatePhoneNumber()) ? "Invalid Phone Number!" : ""}
                                    id="phoneNumber"
                                    label="Phone Number"
                                    name="phoneNumber"
                                    autoComplete="phoneNumber"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    multiline
                                    fullWidth
                                    onChange={handleFormChange}
                                    value={form.address}
                                    rows={4}
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        label="Gender"
                                        name="gender"
                                        onChange={handleFormChange}
                                        value={form.gender}
                                    >
                                        <MenuItem value={"Male"}>Male</MenuItem>
                                        <MenuItem value={"Female"}>Female</MenuItem>
                                        <MenuItem value={"Other"}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
                                    <DatePicker
                                        sx={{ width: "100%" }}
                                        inputFormat='DD-MM-YYYY'
                                        name="dateOfBirth"
                                        onChange={(newDOB) => (setForm({ ...form, dateOfBirth: newDOB.format('DD/MM/YYYY') }))}
                                        value={form.dateOfBirth === "" ? null : dayjs(form.dateOfBirth, "DD/MM/YYYY")}
                                        label="Date of Birth"
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    onChange={handleFormChange}
                                    value={form.password}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    onChange={handleFormChange}
                                    error={(form.password !== "") && !validatePassword()}
                                    helperText={((form.password !== "") && !validatePassword()) ? "Password does not match!" : ""}
                                    value={form.re_password}
                                    name="re_password"
                                    label="Confirm Password"
                                    type="password"
                                    id="re_password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            disabled={!validateForm()}
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update Details
                        </Button>
                    </Box>
                </Container> :
                <>
                    <div>
                        Not Logged In!!!
                    </div>
                </>}
        </>
    );
};

export default ProfilePage;