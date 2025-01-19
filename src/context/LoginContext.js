import React, { createContext, useReducer } from 'react';
import loginReducer, { userDataInitialState } from '../reducers/loginReducer';

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
    const [userData, dispatchUserData] = useReducer(loginReducer, userDataInitialState);
    return (
        <LoginContext.Provider value={{userData, dispatchUserData}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;