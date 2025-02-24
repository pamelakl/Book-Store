import React, { createContext, useContext, useReducer, useEffect } from 'react';
import booksReducer, { booksDataInitialState } from '../reducers/booksReducer';
import { LoginContext } from './LoginContext';

export const BooksContext = createContext();

const BooksContextProvider = (props) => {
    const {userData} = useContext(LoginContext)
    const [booksData, dispatchBooksData] = useReducer(booksReducer, booksDataInitialState);
   
    useEffect(() => {
        if (!localStorage.getItem('allBooks')) {
            localStorage.setItem('allBooks', JSON.stringify(booksDataInitialState.allBooks));
        }
    }, []);

    return (
        <BooksContext.Provider value={{booksData, dispatchBooksData}}>
            {props.children}
        </BooksContext.Provider>
    )
}

export default BooksContextProvider;