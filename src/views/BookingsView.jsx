import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

export default function BookingsView() {
    return (<div className="max-h-[95vh] overflow-y-scroll flex flex-col p-6 md:p-8 lg:p-10">
            <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="bg-white shadow rounded-lg">
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold">Bookings Management</h2>
                            <p className="text-sm text-gray-600">
                                Manage customer bookings and room reservations
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-3 gap-6 grid grid-cols-5">

                    <div className="col-span-2 grid gap-6">
                        <Card>
                            <CardHeader
                                title={<Typography variant="h7">Customer Search</Typography>}
                            />
                            <CardContent className="grid gap-6">
                                {/* Search and Filter Section */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <input
                                            type="search"
                                            placeholder="NIC"
                                            className="w-full max-w-xs pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <Button variant="contained" color="primary" className="ml-4">
                                            Filter
                                        </Button>
                                    </div>
                                </div>

                                {/* Customer Details Section */}
                                <div className="flex flex-col gap-2">
                                    <Typography variant="body1" className="font-semibold">
                                        Customer Details
                                    </Typography>
                                    <div className="flex flex-col gap-1">
                                        {["Name: John Doe", "Email: john.doe@example.com", "Phone: (123) 456-7890"].map((detail, index) => (
                                            <Typography key={index} variant="body2" color="textSecondary">
                                                {detail}
                                            </Typography>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>

                        </Card>

                        <Card>
                            <CardHeader
                                title={<Typography variant="h7">Room Selection</Typography>}
                            />
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    <Typography variant="body1">Room type</Typography>
                                    <Select id="room-type" defaultValue="" fullWidth>
                                        <MenuItem value="" disabled>
                                            Select room type
                                        </MenuItem>
                                        <MenuItem value="single">Single</MenuItem>
                                        <MenuItem value="double">Double</MenuItem>
                                        <MenuItem value="suite">Suite</MenuItem>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Typography variant="body1">Available rooms</Typography>
                                    <div className="grid gap-2 overflow-y-scroll h-[250px]">
                                        {["Room 101", "Room 102", "Room 201"].map((room, index) => (<div
                                            key={index}
                                            className="flex items-center justify-between bg-gray-200 px-4 py-3 rounded-md"
                                        >
                                            <div>
                                                <Typography variant="body1" className="font-medium">
                                                    {room}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {index === 0 ? "Single" : index === 1 ? "Double" : "Suite"}
                                                </Typography>
                                            </div>
                                            <IconButton size="small">
                                                <AddIcon/>
                                            </IconButton>
                                        </div>))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-span-3 grid gap-6">
                        <Card>
                            <CardHeader
                                title={<Typography variant="h7">Booking Summary</Typography>}
                            />
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    {["Room 101 - Single", "Room 102 - Double"].map((room, index) => (<div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <Typography variant="body1" className="font-medium">
                                            {room}
                                        </Typography>
                                        <IconButton size="small">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </div>))}
                                </div>
                                <Divider/>
                                <div className="flex items-center justify-between">
                                    <Typography variant="body1" className="font-medium">
                                        Total
                                    </Typography>
                                    <Typography variant="h4">$450</Typography>
                                </div>
                                <Button variant="contained" size="large" fullWidth>
                                    Confirm Booking
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader
                                title={<Typography variant="h7">Room Details</Typography>}
                            />
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    <Typography variant="body1" className="font-medium">
                                        Room 101 - Single
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        This cozy single room features a comfortable queen-size bed, a
                                        work desk, and an en-suite bathroom with a shower. It's perfect
                                        for solo travelers or those on a business trip.
                                    </Typography>
                                </div>
                                <div className="grid gap-2">
                                    <Typography variant="body1" className="font-medium">
                                        Amenities
                                    </Typography>
                                    <ul className="grid gap-2 text-sm text-gray-500">
                                        {["Free Wi-Fi", "Flat-screen TV", "Mini-fridge", "Complimentary toiletries"].map((amenity, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <CheckIcon color="primary" fontSize="small"/>
                                                {amenity}
                                            </li>))}
                                    </ul>
                                </div>
                                <div className="grid gap-2">
                                    <Typography variant="body1" className="font-medium">
                                        Price
                                    </Typography>
                                    <Typography variant="h4">$150 per night</Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </div>
        </div>

    );
}
