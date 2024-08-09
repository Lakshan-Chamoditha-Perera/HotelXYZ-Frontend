import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteCustomer, getAllCustomers, saveCustomer, updateCustomer} from '../service/CustomerService'
import {toast} from "react-toastify"

export default function ManageCustomer(effect, deps) {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");

    const [isCustomerSelected, setIsCustomerSelected] = useState(false);

    const [customerData, setCustomerData] = useState({
        nic: "", firstName: "", lastName: "", phone: "", email: ""
    });

    useEffect(() => {
        refreshCustomers();
    }, []);

    // handle customer data change
    function handleCustomerDataChange(event) {
        const {id, value} = event.target;
        setCustomerData((prevData) => ({
            ...prevData, [id]: value
        }));
    }

    // get all customers
    function refreshCustomers() {
        console.log("refresh customers")
        getAllCustomers().then((response) => {
            setCustomers(response.data);
            toast.success("Customers fetched successfully", {
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
            toast.error(error.message, {
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
    }

    // delete customer
    function handleDeleteCustomer(id) {
        console.log("handle delete customer : ", id);
        deleteCustomer(id).then(r => {
            toast.success("Customer deleted successfully");
            refreshCustomers();
        }).catch(err => {
            toast.error("Failed to delete customer");
        })
        resetForm();
    }

    // verify customer data
    function verifyCustomerDate(customerData) {
        if (customerData.nic == null || customerData.nic === "") {
            throw new Error("NIC is required");
        }
        if (customerData.firstName == null || customerData.firstName === "") {
            throw new Error("First Name is required");
        }
        if (customerData.lastName == null || customerData.lastName === "") {
            throw new Error("Last Name is required");
        }
        if (customerData.phone == null || customerData.phone === "") {
            throw new Error("Phone is required");
        }
        if (customerData.email == null || customerData.email === "") {
            throw new Error("Email is required");
        }
        return true;
    }


    /**
     * Submit the form and save the customer
     * @param event
     */
    function handleSubmitForm(event) {
        console.log("handle submit form : ", customerData);


        try {
            if (verifyCustomerDate(customerData)) {
                if (!isCustomerSelected) {
                    saveCustomer(customerData)
                        .then((response) => {
                            switch (response.code) {
                                case 409 :
                                    toast.error(response.message || "An error occurred while saving the customer.", {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                    break;
                                case 200:
                                    toast.success("Customer saved successfully!", {
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
                            refreshCustomers();
                        }).catch((error) => {
                        toast.error(error.message || "An error occurred while saving the customer.", {
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
                } else {
                    updateCustomer(customerData).then((response) => {
                        toast.success("Customer updated successfully!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }).catch((error) => {
                        toast.error(error.message || "An error occurred while updating the customer.", {
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
                    setIsCustomerSelected(false);
                }
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

    /**
     * Reset the form
     */
    function resetForm() {
        setCustomerData({
            nic: "", firstName: "", lastName: "", phone: "", email: ""
        });
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

    const filteredCustomers = customers.filter((customer) => customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || customer.email.toLowerCase().includes(searchTerm.toLowerCase()) || customer.phone.includes(searchTerm));

    const sortedCustomers = filteredCustomers.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    function handleTableDataOnClick(customer) {
        console.log("handle table data on click : ", customer);
        setCustomerData({
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone
        })
        setIsCustomerSelected(true)
    }

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
                                    <label htmlFor="phone"
                                           className="text-sm font-medium text-gray-700">Phone</label>
                                    <input id="phone" placeholder="Enter phone number"
                                           value={customerData.phone}
                                           type={'tel'}
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
                                        onClick={handleSubmitForm}
                                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm
                                        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        focus:ring-offset-2">
                                        {!isCustomerSelected ? 'Save' : 'Update'}
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

                        {sortedCustomers.map((customer) => (

                            <tr className={'hover:cursor-pointer'} key={customer.id} onClick={(e) => {
                                e.preventDefault()
                                handleTableDataOnClick(customer)
                            }}>

                                <td className="p-4 border-b">{customer.firstName}</td>
                                <td className="p-4 border-b">{customer.lastName}</td>
                                <td className="p-4 border-b">{customer.email}</td>
                                <td className="p-4 border-b">{customer.phone}</td>
                                <td className="p-4 border-b flex justify-end items-center">
                                    <Button
                                        variant="text"
                                        className="m-1 rounded-full"
                                        startIcon={<DeleteIcon/>}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleDeleteCustomer(customer.id)
                                        }}
                                        sx={{
                                            minWidth: 'auto', padding: '6px', '&:hover': {
                                                backgroundColor: '#ffebee',
                                            },
                                        }}
                                    />
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>)

}

function SearchIcon(props) {
    return (<svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" {...props}>
        <path fillRule="evenodd"
              d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm2 8a6 6 0 1 1 11.192-2.193l4.387 4.387a1 1 0 0 1-1.414 1.415l-4.386-4.387A5.98 5.98 0 0 1 10 12z"
              clipRule="evenodd"/>
    </svg>);
}
