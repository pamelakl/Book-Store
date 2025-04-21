import '../style/books.css';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import '../style/books.css'
import { BooksContext } from '../context/BooksContext';
import AddToCart from './addToCart';
import { useNavigate } from 'react-router-dom';
import { booksDataInitialState } from '../reducers/booksReducer';


function Books(){

    const {booksData} = useContext(BooksContext)

    const [books, setBooks] = useState([]);

    useEffect(()=>{
        const fetchBooks = async () => {
            try{
                const response = await fetch("http://localhost:3000/books") ;
                const data = await response.json();
                setBooks(data.data.books);
            }
            catch(error){
                console.error("Error fetching books:", error);
            }
        }
        fetchBooks();
        
        // fetch("http://localhost:3000/books") 
        //   .then(response => response.json())
        //   .then(data => 
        //     {   
        //         setBooks(data.data.books);
        //     })
        //   .catch(error => console.error("Error fetching books:", error));
    },[])

    const[pageNumber, setPageNumber] = useState(1);

    const totalPages = books.length%5 === 0 ? books.length/5 : (books.length/5)+1

    const navigate = useNavigate();

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
                        <div className='book' >
                            <img src={book.cover} className='book-cover' onClick={()=>navigate(`/Books/${book._id}`)}></img>
                            <div className='book-name'>{`${book.title}` }</div>
                            <div className='book-author'>{`${book.author}`}</div>
                            <div className='book-price'>{`${book.price}`}</div>
                            <div className='add-book-to-cart'>
                                <AddToCart bookID={book._id} title={book.title} author={book.author} 
                                    price={book.price} cover={book.cover} ></AddToCart>
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

export default Books;



