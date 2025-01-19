import '../style/books.css';
import React, { useContext, useReducer } from 'react';
import { useState } from 'react';
import { CiHeart } from "react-icons/ci";
import '../style/books.css'
import AddLikedBook from './addLikedBook';
import BooksContextProvider, { BooksContext } from '../context/BooksContext';
import AddToCart from './addToCart';


function Books(){
    const[books, setBooks] = useState([
        { id: 1, title: 'Harry Potter 1', author: 'JK Rolling', price: 100.80, cover: "/book_1.jpg" },
        { id: 2, title: 'Harry Potter 2', author: 'JK Rolling', price: 100.80, cover: "/book_2.jpg" },
        { id: 3, title: 'Harry Potter 3', author: 'JK Rolling', price: 115.20, cover: "/book_3.jpg" },
        { id: 4, title: 'Harry Potter 4', author: 'JK Rolling', price: 115.20, cover: "/book_4.jpg" },
        { id: 5, title: 'Harry Potter 5', author: 'JK Rolling', price: 115.20, cover: "/book_5.jpg" },
        { id: 6, title: 'Harry Potter 6', author: 'JK Rolling', price: 115.20, cover: "/book_6.jpg" },
        { id: 7, title: 'Harry Potter 7', author: 'JK Rolling', price: 115.20, cover: "/book_7.jpg" },
        { id: 8, title: 'Harry Potter 8', author: 'JK Rolling', price: 106.20, cover: "/book_8.jpg" },
    ]);

    return(
        <BooksContextProvider>
            <div className='book-section'>
                {books.map((book,i)=>(
                    <div className='book'>
                        <img src={book.cover} className='book-cover'></img>
                        <div className='add-liked-book'>
                            <AddLikedBook bookID={book.id} title={book.title} author={book.author} 
                                price={book.price} cover={book.cover}></AddLikedBook>
                        </div>
                        <div className='add-book-to-cart'>
                            <AddToCart bookID={book.id} title={book.title} author={book.author} 
                                price={book.price} cover={book.cover}></AddToCart>
                        </div>
                        <div className='book-name'>{`${book.title}` }</div>
                        <div className='book-author'>{`${book.author}`}</div>
                    </div>
                ))}
            </div>
        </BooksContextProvider>
        
    )
}

export default Books;



