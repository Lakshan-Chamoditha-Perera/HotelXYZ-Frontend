import axios from "axios";

export const getAllCustomers = async (customerData = {}) => {
    try {
        console.log("METHOD getAllCustomers");
        if (Object.keys(customerData).length > 0) {
            for (const key in customerData) {
                if (customerData[key] === '') {
                    delete customerData[key];
                }
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/customers`, {
            params: customerData, headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching customers:", error);
        throw error;
    }
};


export const saveCustomer = async (customerData) => {
    try {
        console.log("METHOD saveCustomer : ", customerData);
        if (Object.keys(customerData).length > 0) {
            for (const key in customerData) {
                if (customerData[key] === '') {
                    delete customerData[key];
                }
            }
        }
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/customers`, customerData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error saving customer:", error);
        throw error;
    }
};


export const deleteCustomer = async (id) => {
    try {
        console.log("METHOD deleteCustomer : ", id);
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/customers/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting customer:", error);
        throw error;
    }
}


export const findCustomerById = async (id) => {
    try {
        console.log("METHOD findCustomerById : ", id);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/customers/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error finding customer:", error);
        throw error;
    }
}

export const updateCustomer = async (id, customerData) => {
    try {
        console.log("METHOD updateCustomer : ", id, customerData);
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/customers/${id}`, customerData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating customer:", error);
        throw error;
    }
}