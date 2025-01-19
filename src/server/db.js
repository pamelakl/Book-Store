import Axios from 'axios';

const DB_URL = process.env.REACT_APP_DB;

export const getRoomsFromDB = async (token) => {
    try {
        const res = await Axios.get(DB_URL + "rooms.json", { params: { auth: token } });
        const rooms = [];
        for (let id in res.data) {
            rooms.push({
                id,
                name: res.data[id].name
            });
        }

        return rooms;
    } catch (err) {
        console.log(err);
    }
};

export const postRoomInDB = async (name, token) => {
    try {
        const res = await Axios.post(
            DB_URL + "rooms.json",
            { name, users: [] },
            { params: { auth: token } }
        );
        return res.data.name;
    } catch (err) {
        console.log(err);
    }
};

export const getRoomData = async (roomId, token) => {
    try {
        const res = await Axios.get(
            DB_URL + "rooms/" + roomId + ".json",
            { params: { auth: token } });
        if (!res.data) {
            throw new Error("Room not found");
        }

        return ({
            name: res.data.name,
            users: res.data.users || []
        });
    } catch (err) {
        throw err;
    }
};