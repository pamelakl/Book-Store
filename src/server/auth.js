import Axios from 'axios';

export const subscribeToSite = async (email, password) => {
    try {
        const res = await Axios.post(process.env.REACT_APP_SUBSCRIBE, { email, password, returnSecureToken: true });
        // console.log("subscribe func", res.data);
        return {
            token: res.data.idToken,
            user: { username: "ReactIsTheBest", id: res.data.localId }
        };
    } catch (err) {
        if (err.response && err.response.status === 400) {
            throw new Error(err.response.data.error.message);
        }
    }
};

export const loginToSite = async (email, password) => {
    console.log("login to site")
    console.dir(process?.env)
    try {
        const res = await Axios.post(
            process.env.REACT_APP_LOGIN, { email, password, returnSecureToken: true }
        );

        return {
            token: res.data.idToken,
            user: { username: "ReactIsTheBest", id: res.data.localId }
        };
    } catch (err) {
        if (err.response && err.response.status === 400) {
            throw new Error("Email or password are invalid.");
        }
    }
};