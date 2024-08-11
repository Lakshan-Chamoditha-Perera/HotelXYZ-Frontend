import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { getAllRooms, saveRoom } from "../service/RoomService";

export default function RoomView() {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("roomNumber");
  const [sortDirection, setSortDirection] = useState("asc");

  const [isRoomSelected, setIsRoomSelected] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({
    id: 0,
    availabilityStatus: "NOT_AVAILABLE",
    price: 0,
    roomNumber: 0,
    type: "",
  });

  useEffect(() => {
    refreshRooms();
  }, []);

  function refreshRooms() {
    console.log("refresh customers");
    getAllRooms()
      .then((response) => {
        setRooms(response.data);
        toast.success("Rooms fetched successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }

  function handleRoomDataChange(event) {
    const { id, value } = event.target;
    setSelectedRoom((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  function setAvailability(event) {
    const value = event.target.value;
    setSelectedRoom((prevData) => ({
      ...prevData,
      availabilityStatus: value,
    }));
  }

  function resetForm() {
    setSelectedRoom({
      id: 0,
      availabilityStatus: "NOT_AVAILABLE",
      price: 0,
      roomNumber: 0,
      type: "",
    });
    setIsRoomSelected(false);
  }

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.roomNumber.toString().includes(searchTerm) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function setRoomType(event) {
    const value = event.target.value;
    setSelectedRoom((prevData) => ({
      ...prevData,
      type: value,
    }));
  }

  function setRoomAvailability(event) {
    const value = event.target.value;
    setSelectedRoom((prevData) => ({
      ...prevData,
      availabilityStatus: value,
    }));
  }
  function verifyRoomData(roomData) {
    if (roomData.roomNumber == null) {
      throw new Error("Room Number must be greater than 0");
    }
    if (roomData.type == null || roomData.type === "") {
      throw new Error("Room Type is required");
    }
    if (roomData.price == null || roomData.price <= 0) {
      throw new Error("Price must be greater than 0");
    }
    if (
      roomData.availabilityStatus == null ||
      roomData.availabilityStatus === ""
    ) {
      throw new Error("Availability Status is required");
    }
    return true;
  }

  function handleSubmitForm(event) {
    console.log("handle submit form: ", selectedRoom);
    try {
      if (verifyRoomData(selectedRoom)) {
        // Assuming you have a verifyRoomData function
        if (!isRoomSelected) {
          saveRoom(selectedRoom) // Change this to saveRoom
            .then((response) => {
              switch (response.code) {
                case 409:
                  toast.error(
                    response.message ||
                      "An error occurred while saving the room.",
                    {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    }
                  );
                  break;
                case 200:
                  toast.success("Room saved successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  resetForm();
                  break;
              }
              refreshRooms(); // Change this to refreshRooms
            })
            .catch((error) => {
              toast.error(
                error.message || "An error occurred while saving the room.",
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
            });
        }

        // else {
        //     updateRoom(selectedRoom) // Change this to updateRoom
        //         .then((response) => {
        //             toast.success("Room updated successfully!", {
        //                 position: "top-right",
        //                 autoClose: 5000,
        //                 hideProgressBar: false,
        //                 closeOnClick: true,
        //                 pauseOnHover: true,
        //                 draggable: true,
        //                 progress: undefined,
        //                 theme: "light",
        //             });
        //         }).catch((error) => {
        //             toast.error(error.message || "An error occurred while updating the room.", {
        //                 position: "top-right",
        //                 autoClose: 5000,
        //                 hideProgressBar: false,
        //                 closeOnClick: true,
        //                 pauseOnHover: true,
        //                 draggable: true,
        //                 progress: undefined,
        //                 theme: "light",
        //             });
        //         });
        //     setIsRoomSelected(false); // Change this to setIsRoomSelected
        // }
        resetForm();
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10">
      <div className="bg-white shadow rounded-lg p-4">
        <div className="border-b border-gray-200 mb-4">
          <h2 className="text-lg font-semibold">Room Management</h2>
          <p className="text-sm text-gray-600">
            Add and update room information.
          </p>
        </div>

        <form className="flex flex-col mb-4">
          <div className="flex flex-wrap gap-8">
            <div className="relative w-full max-w-xs">
              <FormControl fullWidth size="small">
                <TextField
                  label="Room Code"
                  id="roomNumber"
                  placeholder="Enter room number"
                  value={selectedRoom.roomNumber}
                  onChange={handleRoomDataChange}
                  variant="outlined"
                  size="small"
                />
              </FormControl>
            </div>

            <div className="relative w-full max-w-xs">
              <FormControl fullWidth size="small">
                <InputLabel id="type-label">Room Type</InputLabel>
                <Select
                  label="Room Type"
                  labelId="type-label"
                  id="type"
                  value={selectedRoom.type}
                  onChange={setRoomType}
                  variant="outlined"
                >
                  <MenuItem value="SINGLE">Single</MenuItem>
                  <MenuItem value="DOUBLE">Double</MenuItem>
                  <MenuItem value="SUITE">Suite</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="relative w-full max-w-xs">
              <FormControl fullWidth size="small">
                <TextField
                  label="Room Price"
                  id="price"
                  type="number"
                  placeholder="Enter room price"
                  value={selectedRoom.price}
                  onChange={handleRoomDataChange}
                  variant="outlined"
                  size="small"
                />
              </FormControl>
            </div>

            <div className="relative w-full max-w-xs">
              <FormControl fullWidth size="small">
                <InputLabel id="status-label">Room Availability</InputLabel>
                <Select
                  label="Availability"
                  labelId="status-label"
                  id="availabilityStatus"
                  value={selectedRoom.availabilityStatus}
                  onChange={setRoomAvailability}
                  variant="outlined"
                >
                  <MenuItem value="AVAILABLE">Available</MenuItem>
                  <MenuItem value="NOT_AVAILABLE">Not-available</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="contained" color="warning" onClick={resetForm}>
              Clear
            </Button>

            <Button
              variant="contained"
              color={isRoomSelected ? "inherit" : "primary"}
              onClick={handleSubmitForm}
            >
              {isRoomSelected ? "UPDATE" : "SAVE"}
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Room List</h2>
          <p className="text-sm text-gray-600">View and manage all rooms.</p>
        </div>
        <div className="p-4 overflow-y-auto" style={{ maxHeight: "40vh" }}>
          <div className="flex flex-col mb-4">
            <div className="flex flex-wrap gap-8">
              <div className="relative w-full max-w-xs">
                <TextField
                  type="search"
                  placeholder="Search by number"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div className="relative w-full max-w-xs">
                <TextField
                  type="search"
                  placeholder="Search by type"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div className="relative w-full max-w-xs">
                <TextField
                  type="search"
                  placeholder="Search by status"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  variant="outlined"
                  size="small"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="contained" color="primary">
                Filter
              </Button>
            </div>
          </div>
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="cursor-pointer p-4 border-b-2">ID</th>
                <th className="cursor-pointer p-4 border-b-2">Room Number </th>
                <th className="p-4 border-b-2">Type</th>{" "}
                <th className="cursor-pointer p-4 border-b-2">Price</th>
                <th className="p-4 border-b-2">Availability Status</th>
                <th className="p-4 border-b-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-100">
                  <td className="p-4 border-b text-center">{room.id}</td>
                  <td className="p-4 border-b text-center">
                    {room.roomNumber}
                  </td>
                  <td className="p-4 border-b text-center">{room.type}</td>
                  <td className="p-4 border-b text-center">{`$${room.price.toFixed(
                    2
                  )}`}</td>
                  <td
                    className={`p-4 border-b text-sm font-medium rounded-lg text-center ${
                      room.availabilityStatus === "AVAILABLE"
                        ? "text-green-600 "
                        : room.availabilityStatus === "NOT_AVAILABLE"
                        ? "text-red-600 "
                        : "text-orange-600"
                    }`}
                  >
                    {room.availabilityStatus === "AVAILABLE"
                      ? "Available"
                      : room.availabilityStatus === "NOT_AVAILABLE"
                      ? "Not Available"
                      : "Pending"}
                  </td>
                  <td className="p-4 border-b text-right">
                    <Button
                      onClick={() => {
                        setIsRoomSelected(true);
                        setSelectedRoom(room);
                      }}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      style={{ minWidth: "40px", padding: "4px" }}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button
                      onClick={() => {
                        /* Delete action */
                      }}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200 ml-2"
                      style={{ minWidth: "40px", padding: "4px" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
