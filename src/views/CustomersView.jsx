import {useState} from "react";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function ManageCustomer() {
    const [customers, setCustomers] = useState([{
        id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", phone: "+1234567890"
    }, {
        id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", phone: "+1234567891"
    }, {
        id: 3, firstName: "Michael", lastName: "Johnson", email: "michael.johnson@example.com", phone: "+1234567892"
    }, {
        id: 4, firstName: "Emily", lastName: "Davis", email: "emily.davis@example.com", phone: "+1234567893"
    }, {
        id: 5, firstName: "David", lastName: "Lee", email: "david.lee@example.com", phone: "+1234567894"
    }, {
        id: 6, firstName: "Sarah", lastName: "Brown", email: "sarah.brown@example.com", phone: "+1234567895"
    }, {
        id: 7, firstName: "James", lastName: "Wilson", email: "james.wilson@example.com", phone: "+1234567896"
    }, {
        id: 8, firstName: "Jessica", lastName: "Martinez", email: "jessica.martinez@example.com", phone: "+1234567897"
    }, {
        id: 9, firstName: "William", lastName: "Anderson", email: "william.anderson@example.com", phone: "+1234567898"
    }, {
        id: 10, firstName: "Olivia", lastName: "Thomas", email: "olivia.thomas@example.com", phone: "+1234567899"
    }]);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("name");
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

    const filteredCustomers = customers.filter((customer) => customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || customer.email.toLowerCase().includes(searchTerm.toLowerCase()) || customer.phone.includes(searchTerm));

    const sortedCustomers = filteredCustomers.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    return (<div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <div className="bg-white shadow rounded-lg">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold">Customer Management</h2>
                        <p className="text-sm text-gray-600">Add and update customer information.</p>
                    </div>

                    <div className="p-4">
                        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="grid gap-2">
                                <label htmlFor="nic" className="text-sm font-medium text-gray-700">Nic</label>
                                <input id="nic" placeholder="Enter Nic number"
                                       className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First
                                    Name</label>
                                <input id="firstName" placeholder="Enter First name"
                                       className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last
                                    Name</label>
                                <input id="lastName" type="text" placeholder="Enter Last name"
                                       className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
                                <input id="phone" placeholder="Enter phone number"
                                       className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="email"
                                       className="text-sm font-medium text-gray-700">Email</label>
                                <input id="email" type="email" placeholder="Enter email"
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
                <h2 className="text-lg font-semibold">Customer List</h2>
                <p className="text-sm text-gray-600">View and manage all customers.</p>
            </div>
            <div className="p-4 overflow-y-auto" style={{ maxHeight: '45vh' }}>
                <div className="flex items-center justify-between mb-4">
                    <div className="relative w-full max-w-md">
                        <SearchIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400"/>
                        <input
                            type="search"
                            placeholder="Search customers..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="cursor-pointer p-4 border-b-2" onClick={() => handleSort("name")}>
                            First Name
                            {sortColumn === "firstName" &&
                                <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>
                        <th className="cursor-pointer p-4 border-b-2">
                            Last Name
                        </th>
                        <th className="cursor-pointer p-4 border-b-2">
                            Email
                            {sortColumn === "email" &&
                                <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>}
                        </th>
                        <th className="cursor-pointer p-4 border-b-2">
                            Phone
                        </th>

                        <th className="p-4 border-b-2 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>

                    {sortedCustomers.map((customer) => (<tr key={customer.id}>
                        <td className="p-4 border-b">{customer.firstName}</td>
                        <td className="p-4 border-b">{customer.lastName}</td>
                        <td className="p-4 border-b">{customer.email}</td>
                        <td className="p-4 border-b">{customer.phone}</td>

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
