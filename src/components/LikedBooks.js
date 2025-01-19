import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/LoginContext';
import { BooksContext } from '../context/BooksContext';
import { Navigate } from 'react-router-dom';
import '../style/books.css'
import { CiCircleRemove } from "react-icons/ci";
import { removeLikedBookAction } from '../actions/booksActions';


function LikedBooks(){
    const {userData} = useContext(LoginContext);
    const {dispatchBooksData} = useContext(BooksContext);

    if (!userData?.user) {
        return <Navigate to="/connect" replace />;
    }

    const user = userData.user

    const removeBook = (book) => {
        dispatchBooksData(removeLikedBookAction({
            book,
            user
        })) 
    }

    return (
            <div className='book-section'>
                {JSON.parse(localStorage.getItem('likedBooks'))
                //likedBooks
                    .filter((book)=>book.user.id === userData.user.id)
                    .map((book,i)=>(
                        <div className='book'>
                            <img src={book.cover} className='book-cover'></img>
                            <div className='book-name'>{`${book.title}` }</div>
                            <div className='book-author'>{`${book.author}`}</div>
                            <div className='remove-liked-book' onClick={() => removeBook(book)}>
                                <CiCircleRemove size={25}/>
                            </div>
                        </div>
                    ))
                }
            </div>
    )
}
export default LikedBooks;