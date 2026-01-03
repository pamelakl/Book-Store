import '../style/searchBar.css';
import '../style/all.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddToCart from './addToCart';

const SearchBooks = (props) => {
    const {search} = useParams()

    const [books, setBooks] = useState([]);
    
    useEffect(()=>{
        const fetchBooks = async () => {
            try{
                const response = await fetch("http://localhost:3000/books");
                const data = await response.json();
                setBooks((data.data.books).filter((book) => (book.title.toLowerCase()).includes(search?.toLowerCase())));
            }
            catch(error){
                console.error("Error fetching books:", error);
            }
        }
        fetchBooks();
    },[search])
    
    const[pageNumber, setPageNumber] = useState(1);
    
    const totalPages = books.length%5 === 0 ? books.length/5 : (books.length/5)+1;
    
    const[currentBooks, setCurrentBooks] = useState(books.slice((pageNumber - 1) * 5, Math.min(pageNumber * 5, books.length)));
    
    useEffect(()=>{
        setCurrentBooks(books.slice((pageNumber - 1) * 5, Math.min(pageNumber * 5, books.length)));
    },[pageNumber, books])
    
    function handlePageClick(index){
        setPageNumber(index);
    }


    return(
        <div className='book-section'>
            <div className='books'>
                {currentBooks.map((book,i)=>(
                    <div className='book'>
                        <img src={`http://localhost:3000/${book.cover}`} className='book-cover'></img>
                        <div className='book-name'>{`${book.title}` }</div>
                        <div className='book-author'>{`${book.author}`}</div>
                        <div className='add-book-to-cart'>
                            <AddToCart bookID={book._id} title={book.title} author={book.author} 
                                price={book.price} cover={book.cover}></AddToCart>
                        </div>
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