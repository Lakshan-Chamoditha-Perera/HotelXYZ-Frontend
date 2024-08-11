import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";

import { getAllRooms } from "../service/RoomService";
import { findCustomerById } from "../service/CustomerService";
import { saveBooking } from "../service/BookingService";
import RoomCard from "../components/RoomCard";

export default function BookingsView() {
  const [roomList, setRoomList] = useState([]);
  const [cart, setCart] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [customer, setCustomer] = useState({});
  const [customerId, setCustomerId] = useState(0);

  function validateBooking(booking) {
    if (booking.customerId == null || booking.customerId === 0) {
      throw new Error("Customer is required");
    }
    if (booking.checkInDate == null || booking.checkInDate === "") {
      throw new Error("Check-in date is required");
    }
    if (booking.checkOutDate == null || booking.checkOutDate === "") {
      throw new Error("Check-out date is required");
    }

    if (new Date(booking.checkInDate) > new Date(booking.checkOutDate)) {
      throw new Error("Check-out date should be greater than check-in date");
    }

    if (booking.roomIds == null || booking.roomIds.length === 0) {
      throw new Error("At least one room is required");
    }

    if (booking.totalAmount == null || booking.totalAmount === 0) {
      throw new Error("Total price is required");
    }

    return true;
  }

  function handleConfirmBooking() {
    console.log("CONTROLLER :Handle Confirm Booking");
    let booking = {
      customerId: customer.id,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      roomIds: cart?.map((room) => room.id),
      totalAmount: getTotalAmount(),
    };

    try {
      if (validateBooking(booking)) {
        console.log("Booking validated");
        saveBooking(booking)
          .then((response) => {
            console.log("Booking saved");
            console.log(response);
            toast.success("Booking confirmed");
          })
          .catch((error) => {
            console.error("Error saving booking:", error);
            toast.error(error.message);
          });
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast.error(error.message);
    }
  }

  function handleCustomerNICChange(event) {
    setCustomerId(event.target.value);
  }

  function handleFindCustomer() {
    findCustomerById(customerId)
      .then((response) => {
        if (response.id != null) {
          console.log(response);
          setCustomer(response);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }

  function handleDateChange(event) {
    const { id, value } = event.target;
    if (id === "checkInDate") {
      setCheckInDate(value);
    } else if (id === "checkOutDate") {
      setCheckOutDate(value);
    }
  }

  function loadRooms() {
    getAllRooms()
      .then((response) => {
        setRoomList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    loadRooms();
  }, []);
  const handleRemoveFromCart = (room) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== room.id);
    setCart(updatedCart);
  };

  const handleAddToCart = (room) => {
    const isRoomInCart = cart.find((cartItem) => cartItem.id === room.id);
    if (!isRoomInCart) {
      setCart([...cart, room]);
    } else {
      toast.error("Room already added to cart");
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((total, room) => total + room.price, 0);
  };

  return (
    <div className="max-h-[95vh] overflow-y-scroll flex flex-col p-6 md:p-8 lg:p-10">
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
              <CardContent className="p-4">
                {/* Search and Filter Section */}
                <div className="flex items-center gap-4 mb-4">
                  <input
                    id="nic"
                    type="number"
                    placeholder="NIC"
                    value={customerId}
                    onChange={handleCustomerNICChange}
                    className="w-full max-w-xs pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Button
                    onClick={handleFindCustomer}
                    variant="contained"
                    color="primary"
                  >
                    Filter
                  </Button>
                </div>

                {/* Customer Details Section */}
                <div>
                  <Typography variant="body1" className="font-semibold mb-2">
                    Customer Details
                  </Typography>
                  {customer?.id ? (
                    <div className="grid gap-2">
                      <Typography variant="body2" color="textSecondary">
                        ID: {customer.id}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Name: {`${customer.firstName} ${customer.lastName}`}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Email: {customer.email}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Phone: {customer.phone}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        NIC: {customer.nic}
                      </Typography>
                    </div>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Customer not found
                    </Typography>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title={<Typography variant="h7">Room Selection</Typography>}
              />
              <CardContent className="grid gap-4">
                <div className="grid gap-2 px-1">
                  <Typography variant="body1">Room Type</Typography>
                  <div className="">
                    <Select
                      size="small"
                      id="room-type"
                      defaultValue=""
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Select room type
                      </MenuItem>
                      <MenuItem value="SINGLE">Single</MenuItem>
                      <MenuItem value="DOUBLE">Double</MenuItem>
                      <MenuItem value="SUITE">Suite</MenuItem>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2 px-1">
                  <Typography variant="body1">Available Rooms</Typography>
                  <div className="grid gap-4">
                    <div
                      className="overflow-y-auto"
                      style={{ maxHeight: "40vh" }}
                    >
                      {roomList.map((room) => (
                        <RoomCard
                          key={room.id}
                          room={room}
                          onAddToCart={handleAddToCart}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-3 grid gap-6">
            <Card>
              <CardHeader
                title={<Typography variant="h7">Booking Details</Typography>}
              />
              <CardContent className="p-4">
                {/* Booking Dates Section */}
                <div className="flex flex-col gap-4 border-b border-gray-300 pb-4 mb-4">
                  <Typography variant="body1" className="font-medium">
                    Booking Dates
                  </Typography>
                  <div className="flex gap-4">
                    <TextField
                      label="Check-in Date"
                      id="checkInDate"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={handleDateChange}
                    />
                    <TextField
                      label="Check-out Date"
                      id="checkOutDate"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={handleDateChange}
                    />
                  </div>
                </div>

                {/* Person Count Section */}
                <div className="flex flex-col gap-4">
                  <Typography variant="body1" className="font-medium">
                    Person Count
                  </Typography>
                  <div className="flex gap-4">
                    <TextField
                      label="Number of Adults"
                      type="number"
                      defaultValue={1}
                      inputProps={{ min: 1 }}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                    <TextField
                      label="Number of Children"
                      type="number"
                      defaultValue={1}
                      inputProps={{ min: 1 }}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader
                title={<Typography variant="h7">Booking Summary</Typography>}
              />
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  {cart.map((room) => (
                    <div
                      key={room.id}
                      className="flex items-center justify-between"
                    >
                      <Typography variant="body1">
                        Room {room.roomNumber} - {room.type}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveFromCart(room)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                </div>
                <Divider />
                <div className="flex items-center justify-between">
                  <Typography variant="body1" className="font-medium">
                    Total
                  </Typography>
                  <Typography variant="h4">${getTotalAmount()}</Typography>
                </div>
                <Button
                  onClick={handleConfirmBooking}
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Confirm Booking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
