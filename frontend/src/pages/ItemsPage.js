
import { Autocomplete, Box, Checkbox, Slider, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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
        label: '10 years',
    }
];
const conditions = ["New", "Like New", "Excellent", "Very Good", "Good", "Fair", "Poor"];
const categories = ['Computers/Laptops', 'Smartphones/Tablets', 'Cameras', 'Audio Equipment', 'Other Electronic Devices', 'Kitchen Appliances', 'Home Appliances', 'Small Appliances', 'Living Room Furniture', 'Bedroom Furniture', 'Kitchen/Dining Furniture', 'Outdoor Furniture', 'Men\'s Clothing', 'Women\'s Clothing', 'Children\'s Clothing', 'Shoes', 'Accessories', 'Books', 'DVDs/Blu-rays', 'CDs/Vinyl Records', 'Toys', 'Board Games', 'Video Games', 'Decor', 'Gardening Tools', 'Home Improvement Items', 'Sporting Equipment', 'Camping Gear', 'Bicycles', 'Baby Gear', 'Kids\' Toys', 'Children\'s Clothing', 'Hand Tools', 'Power Tools', 'Construction Equipment', 'Skincare Products', 'Haircare Products', 'Health and Wellness Items', 'Art Supplies', 'Craft Materials', 'Hobby Equipment', 'Antiques', 'Memorabilia', 'Collectible Items', 'Cars', 'Bikes', 'Auto Parts', 'Miscellaneous'];



const ItemsPage = () => {

    const [value, setValue] = useState([1, 3]);
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    return (
        <Container maxWidth="xl" sx={{ minHeight: "90vh", mt: 1, display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center" }}>
            <Box sx={{ bgcolor: "#E0EAF4", borderRadius: 2, display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", mt: 2, p: 1 }}>
                <Box width={"100%"} mb={1}>
                    <TextField
                        size="small"
                        fullWidth
                        title="Search"
                        label="Search"
                        sx={{ bgcolor: "#F9F9FF", borderRadius: 1 }}
                    />
                </Box>
                <Stack direction="row" spacing={5}>
                    <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        options={categories}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option}
                            </li>
                        )}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Category" placeholder="Favorites" />
                        )}
                    />
                    <Box sx={{ width: 250 }}>
                        <Slider
                            // size="small"
                            marks={marks} min={0} max={10}
                            getAriaLabel={() => 'Year of use'}
                            value={value}
                            onChange={(newval) => (setValue(newval.target.value))}
                            valueLabelDisplay="auto"
                            getAriaValueText={(val) => `${val} Year`}
                        />
                    </Box>

                    <TextField
                        // size="small"
                        label="Condition"
                        sx={{ bgcolor: "#F9F9FF", borderRadius: 1 }}
                    />
                </Stack>
            </Box>
        </Container>
    );
};

export default ItemsPage;