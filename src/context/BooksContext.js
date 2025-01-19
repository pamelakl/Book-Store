import React, { createContext, useContext, useReducer, useEffect } from 'react';
import booksReducer, { booksDataInitialState } from '../reducers/booksReducer';
import { LoginContext } from './LoginContext';

export const BooksContext = createContext();

const BooksContextProvider = (props) => {
    const {userData} = useContext(LoginContext)
    const [booksData, dispatchBooksData] = useReducer(booksReducer, booksDataInitialState);
   

    useEffect(()=>{
        if (!userData.user) {
        }
    }, [userData]);

    // useEffect(()=>{
    //     localStorage.setItem('booksData', JSON.stringify(booksData));
    //     console.log('likedBooks:', (JSON.parse(localStorage.getItem('booksData'))).likedBooks);
    //     console.log('addedToCart:', (JSON.parse(localStorage.getItem('booksData'))).addedToCart);
    // }, [booksData]);

   // useEffect(()=>{
      //  localStorage.setItem('likedBooks', JSON.stringify(booksData.likedBooks));
    //     console.log('likedBooks:', (JSON.parse(localStorage.getItem('likedBooks'))));
    // }, [booksData.likedBooks]);

    // useEffect(()=>{
    //  //   localStorage.setItem('addedToCart', JSON.stringify(booksData.addedToCart));
    //     console.log('addedToCart:', (JSON.parse(localStorage.getItem('addedToCart'))));
    // }, [booksData.addedToCart]);



    return (
        <BooksContext.Provider value={{booksData, dispatchBooksData}}>
            {props.children}
        </BooksContext.Provider>
    )
}

export default BooksContextProvider;