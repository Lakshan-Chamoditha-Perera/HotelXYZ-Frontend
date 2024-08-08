import axios from "axios";

export const getAllCustomers = async (customerData = {}) => {
    try {
        console.log("METHOD getAllCustomers");

        // Remove empty properties from customerData if it is not empty
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

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching customers:", error);
        throw error;
    }
};
