import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {getAllCustomers} from '../service/CustomerService'
import {Bounce, toast} from "react-toastify"

export default function ManageCustomer() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");

    const [customerData, setCustomerData] = useState({
        nic: "", firstName: "", lastName: "", phone: "", email: ""
    });

    function handleCustomerDataChange(event) {
        const {id, value} = event.target;
        setCustomerData((prevData) => ({
            ...prevData, [id]: value
        }));
    }


    useEffect(() => {
        console.log(process.env.REACT_APP_BACKEND_URL)

        getAllCustomers().then((response) => {
            setCustomers(response.data);
            toast.success("Customers loaded", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }).catch((error) => {
           toast.error(error.response.data.message, {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
           })
        })
    }, [])

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


    return (

        <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10">
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
                                           value={customerData.nic}
                                           onChange={handleCustomerDataChange}
                                           className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First
                                        Name</label>
                                    <input id="firstName" placeholder="Enter First name"
                                           value={customerData.firstName}
                                           onChange={handleCustomerDataChange}
                                           className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last
                                        Name</label>
                                    <input id="lastName" type="text" placeholder="Enter Last name"
                                           value={customerData.lastName}
                                           onChange={handleCustomerDataChange}
                                           className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
                                    <input id="phone" placeholder="Enter phone number"
                                           value={customerData.phone}
                                           onChange={handleCustomerDataChange}
                                           className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="email"
                                           className="text-sm font-medium text-gray-700">Email</label>
                                    <input id="email" type="email" placeholder="Enter email"
                                           value={customerData.email}
                                           onChange={handleCustomerDataChange}
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
                <div className="p-4 overflow-y-auto" style={{maxHeight: '45vh'}}>
                    <div className="flex flex-col mb-4">
                        <div className="flex flex-wrap gap-2 w-full">
                            {/* Search by First Name */}
                            <div className="relative w-full max-w-xs">
                                <SearchIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400"/>
                                <input
                                    type="search"
                                    placeholder="First Name"
                                    value={searchTerm.firstName || ''}
                                    onChange={(e) => setSearchTerm({...searchTerm, firstName: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            {/* Search by Last Name */}
                            <div className="relative w-full max-w-xs">
                                <SearchIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400"/>
                                <input
                                    type="search"
                                    placeholder="Last Name"
                                    value={searchTerm.lastName || ''}
                                    onChange={(e) => setSearchTerm({...searchTerm, lastName: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            {/* Search by Phone */}
                            <div className="relative w-full max-w-xs">
                                <SearchIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400"/>
                                <input
                                    type="search"
                                    placeholder="Phone"
                                    value={searchTerm.phone || ''}
                                    className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            {/* Search by Email */}
                            <div className="relative w-full max-w-xs">
                                <SearchIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400"/>
                                <input
                                    type="search"
                                    placeholder="Email"
                                    value={searchTerm.email || ''}
                                    className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            {/* Search by NIC */}
                            <div className="relative w-full max-w-xs">
                                <SearchIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400"/>
                                <input
                                    type="search"
                                    placeholder="NIC"
                                    value={searchTerm.nic || ''}
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
