import '../style/searchBar.css';
import '../style/all.css';
import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddLikedBook from './addLikedBook';
import AddToCart from './addToCart';
import { BooksContext } from '../context/BooksContext';
import { useNavigate } from 'react-router-dom';

const SearchBooks = (props) => {
    const {search} = useParams()

    const [books, setBooks] = useState((JSON.parse(localStorage.getItem("allBooks"))).filter((book) => book.title.includes(search)))

    const[pageNumber, setPageNumber] = useState(1);
    
    const totalPages = books.length%5 === 0 ? books.length/5 : (books.length/5)+1
    
    const navigate = useNavigate();
    
    const[currentBooks, setCurrentBooks] = useState(books.slice((pageNumber - 1) * 5, Math.min(pageNumber * 5, books.length)));
    
    useEffect(()=>{
        setCurrentBooks(books.slice((pageNumber - 1) * 5, Math.min(pageNumber * 5, books.length)));
    },[pageNumber, books])
    
    useEffect(()=>{
        setBooks((JSON.parse(localStorage.getItem('allBooks'))).filter((book) => book.title.includes(search)))
    },[localStorage.getItem('allBooks'), search])
        
    function handlePageClick(index){
        setPageNumber(index);
    }


    return(
        <div className='book-section'>
            <div className='books'>
                {currentBooks.map((book,i)=>(
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

export default SearchBooks;