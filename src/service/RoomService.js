import axios from "axios";

export const getAllRooms = async (roomData = {}) => {
    try {
        console.log("SERVICE METHOD getAllRooms");
        if (Object.keys(roomData).length > 0) {
            for (const key in roomData) {
                if (roomData[key] === '') {
                    delete roomData[key];
                }
            }
        }

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/rooms`, {
            params: roomData, headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("SERVICE METHOD Error getAllRooms:", error);
        throw error;
    }
};


export const findRoomById = async (id) => {
    try {
        console.log("SERVICE METHOD findRoomById : ", id);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/rooms/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("SERVICE METHOD Error findRoomById:", error);
        throw error;
    }
};


export const saveRoom = async (roomData) => {
    try {
        console.log("SERVICE METHOD saveRoom : ", roomData);
        if (Object.keys(roomData).length > 0) {
            for (const key in roomData) {
                if (roomData[key] === '') {
                    delete roomData[key];
                }
            }
        }
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/rooms`, roomData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("SERVICE METHOD Error saveRoom:", error);
        throw error;
    }
};

export const deleteRoom = async (id) => {
    try {
        console.log("SERVICE METHOD deleteRoom : ", id);
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/rooms/${id}`);
        return response.data;
    } catch (error) {
        console.error("SERVICE METHOD Error deleteRoom:", error);
        throw error;
    }
};
