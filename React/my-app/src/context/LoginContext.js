import React, { createContext, useReducer } from 'react';
import loginReducer, { userDataInitialState } from '../reducers/loginReducer';

export const LoginContext = createContext();

const LoginContextProvider = (props) => {

    const storedUserData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : userDataInitialState;

    const [userData, dispatchUserData] = useReducer(loginReducer, storedUserData);
    

    return (
        <LoginContext.Provider value={{userData, dispatchUserData}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;