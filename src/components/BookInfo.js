import React, { useState, useEffect, useContext } from 'react';
import { BooksContext } from '../context/BooksContext';
import {useParams } from 'react-router-dom';
import '../style/books.css'

const BookInfo = (props) => {
    const {bookId} = useParams();

    // const[books, setBooks] = useState([
    //     { id: 1, title: 'Harry Potter 1', author: 'JK Rolling', price: 100.80, cover: "/book_1.jpg" },
    //     { id: 2, title: 'Harry Potter 2', author: 'JK Rolling', price: 100.80, cover: "/book_2.jpg" },
    //     { id: 3, title: 'Harry Potter 3', author: 'JK Rolling', price: 115.20, cover: "/book_3.jpg" },
    //     { id: 4, title: 'Harry Potter 4', author: 'JK Rolling', price: 115.20, cover: "/book_4.jpg" },
    //     { id: 5, title: 'Harry Potter 5', author: 'JK Rolling', price: 115.20, cover: "/book_5.jpg" },
    //     { id: 6, title: 'Harry Potter 6', author: 'JK Rolling', price: 115.20, cover: "/book_6.jpg" },
    //     { id: 7, title: 'Harry Potter 7', author: 'JK Rolling', price: 115.20, cover: "/book_7.jpg" },
    //     { id: 8, title: 'Harry Potter 8', author: 'JK Rolling', price: 106.20, cover: "/book_8.jpg" },
    // ]);

    const booksData = JSON.parse(localStorage.getItem('allBooks'))
    

    const desctiption = "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!";

    const [bookToDisplay, setBookToDisplay] = useState(null);
    
    useEffect(()=>{
        console.log("here:")
        setBookToDisplay(booksData.find((book)=>book.id===parseInt(bookId, 10)));
    }, [bookId, booksData])

    if (!bookToDisplay) {
        return <p>Book not found or loading...</p>;
    }

    return(
        <div className='book-div'>
            <div class='book-info'>
                <div className='book-info-name'>{`${bookToDisplay.title}` }</div>
                <div className='book-info-author'>{`${bookToDisplay.author}`}</div>
                <div className='book-info-desc'>{`${desctiption}`}</div>
            </div>
            <img src={bookToDisplay.cover} className='book-info-cover'></img>
        </div>
    )
}

export default BookInfo;