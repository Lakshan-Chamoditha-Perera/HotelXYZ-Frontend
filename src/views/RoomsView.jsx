import {useState} from "react";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function RoomView() {
    const [rooms, setRooms] = useState([{id: 1, number: 101, type: "Single", capacity: 1, status: "Available"}, {
        id: 2, number: 102, type: "Double", capacity: 2, status: "Occupied"
    }, {id: 3, number: 103, type: "Suite", capacity: 4, status: "Available"}, {
        id: 4, number: 104, type: "Single", capacity: 1, status: "Occupied"
    }, {id: 5, number: 105, type: "Double", capacity: 2, status: "Available"}, {
        id: 6, number: 106, type: "Suite", capacity: 4, status: "Available"
    }, {id: 7, number: 107, type: "Single", capacity: 1, status: "Occupied"}, {
        id: 8, number: 108, type: "Double", capacity: 2, status: "Available"
    }, {id: 9, number: 109, type: "Suite", capacity: 4, status: "Occupied"}, {
        id: 10, number: 110, type: "Single", capacity: 1, status: "Available"
    }]);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("number");
    const [sortDirection, setSortDirection] = useState("asc");

    const handleSearch = (e) => setSearchTerm(e.target.value);

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const filteredRooms = rooms.filter((room) => room.number.toString().includes(searchTerm) || room.type.toLowerCase().includes(searchTerm.toLowerCase()) || room.status.toLowerCase().includes(searchTerm.toLowerCase()));


    return (<div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <div className="bg-white shadow rounded-lg">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold">Room Management</h2>
                        <p className="text-sm text-gray-600">Add and update room information.</p>
                    </div>

                    <div className="p-4">
                        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="grid gap-2">
                                <label htmlFor="number" className="text-sm font-medium text-gray-700">Room
                                    Number</label>
                                <input id="number" placeholder="Enter room number"
                                       className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="type" className="text-sm font-medium text-gray-700">Type</label>
                                <input id="type" placeholder="Enter room type"
                                       className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="capacity"
                                       className="text-sm font-medium text-gray-700">Capacity</label>
                                <input id="capacity" type="number" placeholder="Enter room capacity"
                                       className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="status" className="text-sm font-medium text-gray-700">Status</label>
                                <input id="status" placeholder="Enter room status"
                                       className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>

                            <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex items-end">
                                <Button
                                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white shadow rounded-lg">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Room List</h2>
                <p className="text-sm text-gray-600">View and manage all rooms.</p>
            </div>
            <div className="p-4 overflow-y-auto" style={{maxHeight: '40vh'}}>
                <div className="flex flex-col mb-4">
                    <div className="flex flex-wrap gap-4 w-full">
                        <div className="relative w-full max-w-xs">
                            <SearchIcon
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                            <input
                                type="search"
                                placeholder="Search by number"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="relative w-full max-w-xs">
                            <SearchIcon
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                            <input
                                type="search"
                                placeholder="Search by type"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="relative w-full max-w-xs">
                            <SearchIcon
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                            <input
                                type="search"
                                placeholder="Search by status"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="flex border justify-end">
                        <Button variant="contained" color="primary">Filter</Button>
                    </div>
                </div>
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="cursor-pointer p-4 border-b-2" onClick={() => handleSort("number")}>
                            Room Number
                            {sortColumn === "number" &&
                                <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>
                        <th className="cursor-pointer p-4 border-b-2">
                            Type
                        </th>
                        <th className="cursor-pointer p-4 border-b-2">
                            Capacity
                            {sortColumn === "capacity" &&
                                <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>
                        <th className="cursor-pointer p-4 border-b-2">
                            Status
                        </th>
                        <th className="p-4 border-b-2 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rooms.map((room) => (<tr key={room.id}>
                        <td className="p-4 border-b">{room.number}</td>
                        <td className="p-4 border-b">{room.type}</td>
                        <td className="p-4 border-b">{room.capacity}</td>
                        <td className="p-4 border-b">{room.status}</td>
                        <td className="p-4 border-b flex justify-end items-center">
                            <Button
                                variant="text"
                                className="m-1 rounded-full"
                                startIcon={<DeleteIcon/>}
                                sx={{
                                    minWidth: 'auto', padding: '6px', '&:hover': {
                                        backgroundColor: '#ffebee',
                                    },
                                }}
                            />
                            <Button
                                variant="text"
                                className="m-1 rounded-full"
                                startIcon={<EditIcon/>}
                                sx={{
                                    minWidth: 'auto', padding: '6px', '&:hover': {
                                        backgroundColor: '#e3f2fd',
                                    },
                                }}
                            />
                        </td>
                    </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}

function SearchIcon(props) {
    return (<svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" {...props}>
        <path fillRule="evenodd"
              d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm2 8a6 6 0 1 1 11.192-2.193l4.387 4.387a1 1 0 0 1-1.414 1.415l-4.386-4.387A5.98 5.98 0 0 1 10 12z"
              clipRule="evenodd"/>
    </svg>);
}
