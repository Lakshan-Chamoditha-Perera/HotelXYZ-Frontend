import React, { useState, useEffect } from "react";
import { getAllBookings } from "../service/BookingService";
import { toast } from "react-toastify";
import InfoIcon from "@mui/icons-material/Info";

const Home = () => {
  const [bookingsList, setBookingsList] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [bookedCount, setBookedCount] = useState(0);

  useEffect(() => {
    refreshBookings();
  }, []);

  function refreshBookings() {
    getAllBookings()
      .then((bookings) => {
        console.log("Bookings:", bookings);
        setBookingsList(bookings);

        const total = bookings
          .reduce((acc, booking) => acc + booking.totalAmount, 0)
          .toFixed(2);
        setTotalRevenue(total);

        const booked = bookings.filter(
          (booking) => booking.status === "BOOKED"
        ).length;
        setBookedCount(booked);
      })
      .catch((error) => {
        console.error("Error getting bookings:", error);
        toast.error("Error getting bookings");
      });
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="text-2xl font-bold text-gray-900">
          Admin Reservation Dashboard
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <div className="text-xl font-semibold">New Booking</div>
              <div className="text-3xl font-bold">24</div>
            </div>
            <div className="text-purple-600 bg-purple-100 p-2 rounded-full">
              <span className="text-lg">20%</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <div className="text-xl font-semibold">Total Revenue</div>
              <div className="text-3xl font-bold">{totalRevenue}</div>
            </div>
            <div className="text-red-600 bg-red-100 p-2 rounded-full">
              <span className="text-lg">20%</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <div className="text-xl font-semibold">Total Reserved</div>
              <div className="text-3xl font-bold">{bookedCount}</div>
            </div>
            <div className="text-blue-600 bg-blue-100 p-2 rounded-full">
              <span className="text-lg">
                {(bookedCount / bookingsList.length) * 100}%
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4 font-semibold text-gray-900">
            Visitor Statistics
          </div>
          <table className="w-full text-left p-2">
            <thead>
              <tr>
                <th className="pb-4 px-2">ID</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Checking Date</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingsList && bookingsList.length > 0 ? (
                bookingsList.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-gray-200 hover:bg-gray-100 rounded transition duration-200"
                  >
                    <td className="py-4 px-2">{booking.id}</td>
                    <td className="py-4">{booking.customerId}</td>
                    <td className="py-4">{booking.checkInDate}</td>
                    <td
                      className={
                        booking.status === "BOOKED"
                          ? "py-4 text-green-600 font-semibold"
                          : "py-4 text-red-600 font-semibold"
                      }
                    >
                      {booking.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center">
                    <InfoIcon className="h-6 w-6 text-gray-400 mx-4" />
                    No any bookings yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
