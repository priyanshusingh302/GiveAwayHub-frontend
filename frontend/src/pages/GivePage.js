
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../helpers/AuthContext";
import { getAuthToken, request } from "../helpers/axios_helper";

const conditions = ["New", "Like New", "Excellent", "Very Good", "Good", "Fair", "Poor"];
const categories = ['Computers/Laptops', 'Smartphones/Tablets', 'Cameras', 'Audio Equipment', 'Other Electronic Devices', 'Kitchen Appliances', 'Home Appliances', 'Small Appliances', 'Living Room Furniture', 'Bedroom Furniture', 'Kitchen/Dining Furniture', 'Outdoor Furniture', 'Men\'s Clothing', 'Women\'s Clothing', 'Children\'s Clothing', 'Shoes', 'Accessories', 'Books', 'DVDs/Blu-rays', 'CDs/Vinyl Records', 'Toys', 'Board Games', 'Video Games', 'Decor', 'Gardening Tools', 'Home Improvement Items', 'Sporting Equipment', 'Camping Gear', 'Bicycles', 'Baby Gear', 'Kids\' Toys', 'Children\'s Clothing', 'Hand Tools', 'Power Tools', 'Construction Equipment', 'Skincare Products', 'Haircare Products', 'Health and Wellness Items', 'Art Supplies', 'Craft Materials', 'Hobby Equipment', 'Antiques', 'Memorabilia', 'Collectible Items', 'Cars', 'Bikes', 'Auto Parts', 'Miscellaneous'];


const GiveAway = () => {
    const randomImageId = Math.floor(Math.random() * 1000) + 1;
    const srcImg = `https://picsum.photos/id/${randomImageId}/300/200`;

    const authState = useContext(AuthContext).state;

    const [imagePreview, setImagePreview] = useState("https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg");
    const [image, setImage] = useState(null);

    const [form, setForm] = React.useState({
        name: "",
        condition: "",
        category: "",
        yearOfUse: "",
        description: ""
    });


    const handleSubmit = async () => {
        const data = {
            userId: authState.data?.id,
            name: form.name,
            description: form.description,
            condition: form.condition,
            category: form.category,
            yearOfUse: form.yearOfUse,
            file: image
        }
        console.log(data);
        axios.post(
            `${axios.defaults.baseURL}/item/add`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${getAuthToken()}`,
                    "Content-type": "multipart/form-data",
                },
            }
        )
            .then(res => {
                console.log(`Success:` + res.data);
                alert("Item posted!!");
            })
            .catch(err => {
                console.log(err);
                alert("Error!!");
            })
    }

    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        console.log(form);
    }

    categories.sort();

    return (
        <>{
            authState.isLoggedIn ?
                <Container maxWidth="lg" sx={{ minHeight: "90vh", borderRadius: 1, mt: 1, p: 5, display: "flex", flexDirection: "row", }}>
                    <Box sx={{ ml: 10, mr: 5 }} width={300} display="flex" flexDirection="column" alignItems="center" alignContent="center" gap={4}>
                        <Box width={250} height={250} sx={{
                            bgcolor: "white", mt: 5, display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: 2,
                            borderColor: "#dddddd"
                        }}>
                            <img
                                style={{
                                    objectFit: "fill",
                                    height: 250,
                                    width: 250
                                }}
                                src={imagePreview}
                                alt="Not Present"
                            />
                        </Box>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload Image
                            <input
                                accept="image/*"
                                type="file"
                                hidden
                                onChange={(newImage) => { setImagePreview(URL.createObjectURL(newImage.target.files[0])); setImage(newImage.target.files[0]) }}
                            />
                        </Button>
                    </Box>
                    <Box width={600} mt={5} display="flex" flexDirection="column" alignItems="center" gap={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    value={form.name}
                                    required
                                    fullWidth
                                    onChange={handleFormChange}
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    value={form.yearOfUse}
                                    type="number"
                                    onChange={handleFormChange}
                                    id="yearOfUse"
                                    label="Year of Use"
                                    name="yearOfUse"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        label="Category"
                                        name="category"
                                        onChange={handleFormChange}
                                        value={form.category}
                                    >
                                        {
                                            categories.map((category) => (
                                                <MenuItem value={category}>{category}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Condition</InputLabel>
                                    <Select
                                        label="Condition"
                                        name="condition"
                                        onChange={handleFormChange}
                                        value={form.condition}
                                    >
                                        {
                                            conditions.map((condition) => (
                                                <MenuItem value={condition}>{condition}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    multiline
                                    fullWidth
                                    onChange={handleFormChange}
                                    value={form.description}
                                    rows={5}
                                    id="description"
                                    label="Description"
                                    name="description"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Post
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

export default GiveAway;