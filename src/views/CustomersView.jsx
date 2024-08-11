import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteCustomer,
  getAllCustomers,
  saveCustomer,
  updateCustomer,
} from "../service/CustomerService";
import { toast } from "react-toastify";

export default function ManageCustomer(effect, deps) {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    nic: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [isCustomerSelected, setIsCustomerSelected] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState({
    id: "",
    nic: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  // handle customer data change
  function handleCustomerDataChange(event) {
    const { id, value } = event.target;
    setSelectedCustomer((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }
  useEffect(() => {
    refreshCustomers();
  }, []);

  // get all customers
  function refreshCustomers() {
    console.log("refresh customers");
    getAllCustomers()
      .then((response) => {
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

  // delete customer
  function handleDeleteCustomer(id) {
    console.log("handle delete customer : ", id);
    deleteCustomer(id)
      .then((r) => {
        toast.success("Customer deleted successfully");
        refreshCustomers();
      })
      .catch((err) => {
        toast.error("Failed to delete customer");
      });
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
    console.log("handle submit form : ", selectedCustomer);
    try {
      if (verifyCustomerDate(selectedCustomer)) {
        if (!isCustomerSelected) {
          saveCustomer(selectedCustomer)
            .then((response) => {
              switch (response.code) {
                case 409:
                  toast.error(
                    response.message ||
                      "An error occurred while saving the customer.",
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
            })
            .catch((error) => {
              toast.error(
                error.message || "An error occurred while saving the customer.",
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
        } else {
          updateCustomer(selectedCustomer)
            .then((response) => {
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
            })
            .catch((error) => {
              toast.error(
                error.message ||
                  "An error occurred while updating the customer.",
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
    setSelectedCustomer({
      id: "",
      nic: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    });
    setIsCustomerSelected(false);
  }

  function searchCustomerFormOnChange(event) {
    let { id, value } = event.target;
    id = id.split("_")[1];
    setSearchTerm((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    console.log("search term : ", searchTerm);
  }

  function handleTableDataOnClick(customer) {
    console.log("handle table data on click : ", customer);
    setSelectedCustomer({
      id: customer.id,
      nic: customer.nic,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
    });
    setIsCustomerSelected(true);
  }

  function searchCustomers() {
    console.log("search customers : ", searchTerm);
    getAllCustomers(searchTerm)
      .then((response) => {
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

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10">
      <div className="bg-white shadow rounded-lg p-4">
        <div className="border-b border-gray-200 mb-4">
          <h2 className="text-lg font-semibold">Customer Management</h2>
          <p className="text-sm text-gray-600">
            Add and update customer information.
          </p>
        </div>

        <form className="flex flex-col mb-4">
          <div className="flex flex-wrap gap-8">
            <div className="grid gap-2">
              <label
                htmlFor="nic"
                className="text-sm font-medium text-gray-700"
              >
                Nic
              </label>
              <input
                id="nic"
                placeholder="Enter Nic number"
                value={selectedCustomer.nic}
                onChange={handleCustomerDataChange}
                className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                placeholder="Enter First name"
                value={selectedCustomer.firstName}
                onChange={handleCustomerDataChange}
                className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter Last name"
                value={selectedCustomer.lastName}
                onChange={handleCustomerDataChange}
                className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                placeholder="Enter phone number"
                value={selectedCustomer.phone}
                type={"tel"}
                onChange={handleCustomerDataChange}
                className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={selectedCustomer.email}
                onChange={handleCustomerDataChange}
                className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="contained"
              style={{ backgroundColor: "#f44336", color: "#fff" }}
              onClick={resetForm}
            >
              Clear
            </Button>

            <Button
              variant="contained"
              color={isCustomerSelected ? "inherit" : "primary"}
              onClick={handleSubmitForm}
            >
              {!isCustomerSelected ? "Save" : "Update"}
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Customer List</h2>
          <p className="text-sm text-gray-600">
            View and manage all customers.
          </p>
        </div>
        <div className="p-4 overflow-y-auto" style={{ maxHeight: "45vh" }}>
          <div className="flex flex-col mb-4">
            <div className="flex flex-wrap gap-2 w-full">
              {/* Search by First Name */}
              <div className="relative w-full max-w-xs">
                <SearchIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <input
                  id="searchTerm_firstName"
                  type="search"
                  placeholder="First Name"
                  value={searchTerm.firstName}
                  onChange={searchCustomerFormOnChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* Search by Last Name */}
              <div className="relative w-full max-w-xs">
                <SearchIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <input
                  id="searchTerm_lastName"
                  type="search"
                  placeholder="Last Name"
                  value={searchTerm.lastName}
                  onChange={searchCustomerFormOnChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* Search by Phone */}
              <div className="relative w-full max-w-xs">
                <SearchIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <input
                  id="searchTerm_phone"
                  type="search"
                  placeholder="Phone"
                  value={searchTerm.phone}
                  onChange={searchCustomerFormOnChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* Search by Email */}
              <div className="relative w-full max-w-xs">
                <SearchIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <input
                  id="searchTerm_email"
                  type="search"
                  placeholder="Email"
                  value={searchTerm.email}
                  onChange={searchCustomerFormOnChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* Search by NIC */}
              <div className="relative w-full max-w-xs">
                <SearchIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <input
                  id="searchTerm_nic"
                  type="search"
                  placeholder="NIC"
                  value={searchTerm.nic}
                  onChange={searchCustomerFormOnChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                variant="contained"
                color="primary"
                onClick={searchCustomers}
              >
                Filter
              </Button>
            </div>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="cursor-pointer p-4 border-b-2">Nic</th>

                <th className="cursor-pointer p-4 border-b-2">First Name</th>
                <th className="cursor-pointer p-4 border-b-2">Last Name</th>
                <th className="cursor-pointer p-4 border-b-2">Email</th>
                <th className="cursor-pointer p-4 border-b-2">Phone</th>

                <th className="p-4 border-b-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  className={"hover:cursor-pointer"}
                  key={customer.id}
                  onClick={() => {
                    handleTableDataOnClick(customer);
                  }}
                >
                  <td className="p-4 text-center border-b">{customer.nic}</td>
                  <td className="p-4 text-center border-b">
                    {" "}
                    {customer.firstName}
                  </td>
                  <td className="p-4 text-center border-b">
                    {" "}
                    {customer.lastName}
                  </td>
                  <td className="p-4 text-center border-b">{customer.email}</td>
                  <td className="p-4 text-center border-b">{customer.phone}</td>
                  <td className="p-4 text-center border-b flex justify-end items-center">
                    <Button
                      variant="text"
                      className="m-1 rounded-full"
                      startIcon={<DeleteIcon />}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteCustomer(customer.id);
                      }}
                      sx={{
                        minWidth: "auto",
                        padding: "6px",
                        "&:hover": {
                          backgroundColor: "#ffebee",
                        },
                      }}
                    />
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

function SearchIcon(props) {
  return (
    <svg
      className="h-5 w-5 text-gray-400"
      fill="currentColor"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm2 8a6 6 0 1 1 11.192-2.193l4.387 4.387a1 1 0 0 1-1.414 1.415l-4.386-4.387A5.98 5.98 0 0 1 10 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}
