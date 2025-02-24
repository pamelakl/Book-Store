import React, { createContext, useReducer, useState } from 'react';
import { useEffect } from 'react';
import loginReducer, { userDataInitialState } from '../reducers/loginReducer';

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
    const [userData, dispatchUserData] = useReducer(loginReducer, userDataInitialState);

    // if (!localStorage.getItem('userData')) {
    //     localStorage.setItem('userData', JSON.stringify(userDataInitialState));
    // }
    
    useEffect(() => {
        if (localStorage.getItem('userData') != '[]') {
            localStorage.setItem('userData', JSON.stringify(userDataInitialState));
        }
    }, []);

    return (
        <LoginContext.Provider value={{userData, dispatchUserData}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;