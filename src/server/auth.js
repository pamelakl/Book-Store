import Axios from 'axios';

export const subscribeToSite = async (email, password) => {
    try {
        const res = await Axios.post(process.env.REACT_APP_SUBSCRIBE, { email, password, returnSecureToken: true });
        // console.log("subscribe func", res.data);
        return {
            token: res.data.idToken,
            user: { username: "ReactIsTheBest", email: res.data.email,  id: res.data.localId, admin: false }
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
            user: { username: "ReactIsTheBest",email: res.data.email, id: res.data.localId, admin: res.data.localId === 'itanBXN5WUgbzWkXHOVcU6iifWF2' ? true : false  } 
        };
    } catch (err) {
        if (err.response && err.response.status === 400) {
            throw new Error("Email or password are invalid.");
        }
    }
};

export const changeEmail = async (email, token) => {
    console.dir(process?.env)
    try{
        const res = await Axios.post(
            process.env.REACT_APP_CHANGE_EMAIL, {idToken: token, email, returnSecureToken: true}
        );

        return{
            token: res.data.idToken,
            user: { username: "ReactIsTheBest",email: res.data.email, id: res.data.localId, admin: res.data.localId === 'itanBXN5WUgbzWkXHOVcU6iifWF2' ? true : false  } 
        };
    }catch (err) {
        if (err.response && err.response.status === 400) {
            throw new Error("Email or password are invalid.");
        }
    }
}

export const changePassword = async (password, token) => {
    console.dir(process?.env)
    try{
        const res = await Axios.post(
            process.env.REACT_APP_CHANGE_PASSWORD, {idToken: token, password, returnSecureToken: true}
        );

        return{
            token: res.data.idToken,
            user: { username: "ReactIsTheBest",email: res.data.email, id: res.data.localId, admin: res.data.localId === 'itanBXN5WUgbzWkXHOVcU6iifWF2' ? true : false  } 
        };
    }catch (err) {
        if (err.response && err.response.status === 400) {
            throw new Error("Email or password are invalid.");
        }
    }
}

export const deleteAccount = async (token) => {
    console.dir(process?.env)
    try{
        const res = await Axios.post(
            process.env.REACT_APP_DELETE_ACCOUNT, {idToken: token}
        );

        return{
            token: token
        }
    }catch (err) {
        if (err.response && err.response.status === 400) {
            throw new Error("delete account invalid.");
        }
    }
}