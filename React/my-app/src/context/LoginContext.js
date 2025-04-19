import React, { createContext, useReducer, useState } from 'react';
import { useEffect } from 'react';
import loginReducer, { userDataInitialState } from '../reducers/loginReducer';

export const LoginContext = createContext();

const LoginContextProvider = (props) => {

    const storedUserData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : userDataInitialState;

    const [userData, dispatchUserData] = useReducer(loginReducer, storedUserData);
    
    // useEffect(() => {
    //     if (!localStorage.getItem('userData')) {
    //         localStorage.setItem('userData', JSON.stringify(userDataInitialState));
    //     }
    // }, []);

    return (
        <LoginContext.Provider value={{userData, dispatchUserData}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;