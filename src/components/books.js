import '../style/books.css';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import '../style/books.css'
import AddLikedBook from './addLikedBook';
import { BooksContext } from '../context/BooksContext';
import AddToCart from './addToCart';
import { useNavigate } from 'react-router-dom';
import { booksDataInitialState } from '../reducers/booksReducer';


function Books(){

    const {booksData} = useContext(BooksContext)

    const [books, setBooks] = useState(() => {
        const storedBooks = localStorage.getItem("allBooks");
        return storedBooks ? JSON.parse(storedBooks) : booksDataInitialState.allBooks;
    });

    const[pageNumber, setPageNumber] = useState(1);

    const totalPages = books.length%5 === 0 ? books.length/5 : (books.length/5)+1

    const navigate = useNavigate();

    const[currentBooks, setCurrentBooks] = useState(books.slice((pageNumber - 1) * 5, Math.min(pageNumber * 5, books.length)));

    useEffect(()=>{
        setCurrentBooks(books.slice((pageNumber - 1) * 5, Math.min(pageNumber * 5, books.length)));
    },[pageNumber, books])

    useEffect(()=>{
            setBooks(JSON.parse(localStorage.getItem('allBooks')))
        },[localStorage.getItem('allBooks')])
    
    function handlePageClick(index){
        setPageNumber(index);
    }

    return(
       
            <div className='book-section'>
                <div className='books'>
                    {currentBooks.map((book,i)=>(
                        <div className='book' >
                            <img src={book.cover} className='book-cover' onClick={()=>navigate(`/Books/${book.id}`)}></img>
                            <div className='add-liked-book'>
                                <AddLikedBook bookID={book.id} title={book.title} author={book.author} 
                                    price={book.price} cover={book.cover}></AddLikedBook>
                            </div>
                            <div className='add-book-to-cart'>
                                <AddToCart bookID={book.id} title={book.title} author={book.author} 
                                    price={book.price} cover={book.cover} ></AddToCart>
                            </div>
                            <div className='book-name'>{`${book.title}` }</div>
                            <div className='book-author'>{`${book.author}`}</div>
                            <div className='book-price'>{`${book.price}`}</div>
                        </div>
                    ))}
                </div>
                
                <div className='pageNumbers'>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index + 1}  onClick={() => handlePageClick(index + 1)} className={`page-button ${pageNumber === index + 1 ? 'active' : ''}`}>
                            {index + 1}
                        </button>
                    ))}
                </div>

            </div>
       
        
    )
}

export default Books;



