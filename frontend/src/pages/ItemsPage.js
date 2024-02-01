import { useEffect, useState } from "react";
import { Autocomplete, Box, Chip, Grid, Slider, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { request } from "../helpers/axios_helper";
import { ItemCard } from "../components/Card";

const marks = [
    {
        value: 0,
        label: 'New',
    },
    {
        value: 5,
        label: '5 years',
    },
    {
        value: 10,
        label: 'Max',
    }
];
const conditions = ["New", "Like New", "Excellent", "Very Good", "Good", "Fair", "Poor"];
const categories = ['Computers/Laptops', 'Smartphones/Tablets', 'Cameras', 'Audio Equipment', 'Other Electronic Devices', 'Kitchen Appliances', 'Home Appliances', 'Small Appliances', 'Living Room Furniture', 'Bedroom Furniture', 'Kitchen/Dining Furniture', 'Outdoor Furniture', 'Men\'s Clothing', 'Women\'s Clothing', 'Children\'s Clothing', 'Shoes', 'Accessories', 'Books', 'DVDs/Blu-rays', 'CDs/Vinyl Records', 'Toys', 'Board Games', 'Video Games', 'Decor', 'Gardening Tools', 'Home Improvement Items', 'Sporting Equipment', 'Camping Gear', 'Bicycles', 'Baby Gear', 'Kids\' Toys', 'Children\'s Clothing', 'Hand Tools', 'Power Tools', 'Construction Equipment', 'Skincare Products', 'Haircare Products', 'Health and Wellness Items', 'Art Supplies', 'Craft Materials', 'Hobby Equipment', 'Antiques', 'Memorabilia', 'Collectible Items', 'Cars', 'Bikes', 'Auto Parts', 'Miscellaneous'];

const ItemsPage = () => {
    const [searchValue, setSearchValue] = useState("");
    const [value, setValue] = useState([0, 10]);
    const [categoryList, setCatL] = useState([]);
    const [conditionList, setConL] = useState([]);
    const [items, setItems] = useState([]);
    const fixedOptions1 = [];
    const fixedOptions2 = [];


    const getItems = async () => {
        const response = await request("get", "/item/all", null);
        if (response.success) {
            setItems(response.data);
        }
        else {
            console.log("error fetching items");
        }
    }

    useEffect(() => {
        getItems();
    }, []);

    categories.sort();

    return (
        <Container maxWidth="xl" sx={{ minHeight: "90vh", mt: 1, display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center" }}>
            <Box sx={{ bgcolor: "#EAEAEA", borderRadius: 2, display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", mt: 1, p: 1, boxShadow: 1 }}>
                <Box width={"100%"} mb={1}>
                    <TextField
                        size="small"
                        fullWidth
                        onChange={(newVal) => (setSearchValue(newVal.target.value))}
                        label="Search"
                        sx={{ bgcolor: "white", borderRadius: 1 }}
                    />
                </Box>
                <Grid container spacing={5}>
                    <Grid item xl={4} xs={12} md={4} lg={4}>
                        <Autocomplete
                            multiple
                            id="fixed-tags-demo"
                            value={categoryList}
                            onChange={(event, newValue) => {
                                setCatL([...fixedOptions1,
                                ...newValue.filter((option) => fixedOptions1.indexOf(option) === -1),]);
                            }}
                            options={categories}
                            getOptionLabel={(option) => option}
                            renderTags={(tagValue, getTagProps) =>
                                tagValue.map((option, index) => (
                                    <Chip
                                        label={option}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            style={{ width: 250 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Category" />
                            )}
                        />
                    </Grid>
                    <Grid item xl={4} xs={12} md={4} lg={4}>
                        <Box sx={{ width: 250, display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", }}>
                            <Slider
                                marks={marks} min={0} max={10}
                                getAriaLabel={() => 'Year of use'}
                                value={value}
                                onChange={(newval) => (setValue(newval.target.value))}
                                valueLabelDisplay="auto"
                                getAriaValueText={(val) => `${val} Year`}
                            />
                        </Box></Grid>
                    <Grid item xl={4} xs={12} md={4} lg={4}>
                        <Autocomplete
                            multiple
                            id="fixed-tags-demo"
                            value={conditionList}
                            onChange={(event, newValue) => {
                                setConL([...fixedOptions2,
                                ...newValue.filter((option) => fixedOptions2.indexOf(option) === -1),]);
                            }}
                            options={conditions}
                            getOptionLabel={(option) => option}
                            renderTags={(tagValue, getTagProps) =>
                                tagValue.map((option, index) => (
                                    <Chip
                                        label={option}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            style={{ width: 250 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Condition" />
                            )}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    mt: 2,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: 1,
                    borderRadius: 1,
                    borderColor: "#DDDDDD",
                    padding: 1
                }}
            >
                <Grid container spacing={2} >
                    {items.filter((item) => {
                        return (
                            item.name.toLowerCase().includes(searchValue.toLowerCase()) &&
                            (categoryList.length !== 0 ? categoryList.includes(item.category) : 1) &&
                            item.yearOfUse >= value[0] &&
                            (value[1] === 10 ? 1 : item.yearOfUse <= value[1]) &&
                            (conditionList.length !== 0 ? conditionList.includes(item.condition) : 1)
                        );
                    }
                    ).map(item =>
                    (
                        <Grid item xl={4} xs={12} md={12} lg={6}>
                            <ItemCard item={item} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </Container>
    );
};

export default ItemsPage;