import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import BooksContextProvider, { BooksContext } from '../context/BooksContext';
import { Navigate } from 'react-router-dom';


function Cart(){
    const {userData} = useContext(LoginContext);
    const {booksData} = useContext(BooksContext);
    
    if (!userData?.user) {
        return <Navigate to="/connect" replace />;
    }

    return (
        <div className='book-section'>
            {((JSON.parse(localStorage.getItem('addedToCart')))).map((book,i)=>(
                <div className='book'>
                    <img key={`img-${i}`} src={book.cover} className='book-cover'></img>
                    <div key={`book-name-${i}`} className='book-name'>{`${book.title}` }</div>
                    <div className='book-author'>{`${book.author}`}</div>
                </div>
            ))
            }
        </div>
    )
}
export default Cart;