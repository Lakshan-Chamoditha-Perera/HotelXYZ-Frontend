
import axios from 'axios';

export const saveBooking = async (bookingData) =>
{
    try
    {
        console.log("SERVICE METHOD saveBooking ");
        console.log("SERVICE METHOD saveBooking : ", bookingData);
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bookings`, bookingData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error)
    {
        console.error("Error saving booking:", error);
        throw error;
    }
}

export const getAllBookings = async () =>
{
    try
    {
        console.log("SERVICE METHOD getAllBookings");
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bookings`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data.data;
    } catch (error)
    {
        console.error("Error getting all bookings:", error);
        throw error;
    }
}