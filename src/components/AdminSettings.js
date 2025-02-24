import '../style/books.css';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import '../style/books.css'
import AddLikedBook from './addLikedBook';
import  { BooksContext } from '../context/BooksContext';
import AddToCart from './addToCart';
import { Navigate, useNavigate } from 'react-router-dom';
import ChangeBookSettings from './changeBookSettings';
import { CiCircleRemove } from "react-icons/ci";
import { removeBookAction } from '../actions/booksActions';
import { LoginContext } from '../context/LoginContext';
import AddNewBook from './AddNewBook';
import { booksDataInitialState } from '../reducers/booksReducer';
import { userDataInitialState } from '../reducers/loginReducer';


function AdminSettings(){
    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
    });

    const navigate = useNavigate()

    if(!userData?.user?.admin){
        navigate('/')
    }

    const {booksData, dispatchBooksData} = useContext(BooksContext)

    const [books, setBooks] = useState(() => {
        const storedBooks = localStorage.getItem("allBooks");
        return storedBooks ? JSON.parse(storedBooks) : booksDataInitialState.allBooks;
    });

    const[pageNumber, setPageNumber] = useState(1);

    const totalPages = books.length%5 === 0 ? books.length/5 : (books.length/5)+1

    const[currentBooks, setCurrentBooks] = useState(books.slice((pageNumber - 1) * 5, Math.min(pageNumber * 5, books.length)));

    useEffect(()=>{
        setCurrentBooks(books.slice((pageNumber - 1) * 5, Math.min(pageNumber * 5, books.length)));
    },[pageNumber, books])

    function handlePageClick(index){
        setPageNumber(index);
    }

    const user = userData.user;

    const removeBook = (book) => {
        dispatchBooksData(removeBookAction({ book })) ;
        setBooks((prevBooks) => {
            const updatedBooks = prevBooks.filter(b => b.id !== book.id);
            return updatedBooks;
        });

    }

    const addBook = (newBook) => {
        // Add the new book to the books state
        setBooks((prevBooks) => [...prevBooks, newBook]);
    };

    return(
            <div className='book-section'>
                <div>
                    <div className='books'>
                    {currentBooks.map((book,i)=>(
                        <div className='book'>
                            <img key={`img-${i}`} src={book.cover} className='book-cover'></img>
                            <div key={`book-name-${i}`} className='liked-book-name'>{`${book.title}` }</div>
                            <div key={`book-author-${i}`} className='liked-book-author'>{`${book.author}`}</div>
                            <div key={`book-price-${i}`} className='liked-book-price'>{`${book.price}`}</div>
                            <div key={`remove-book-${i}`} className='remove-liked-book' onClick={() => removeBook(book)}>
                                <CiCircleRemove size={25}/>
                            </div>
                            <div className='change-book-settings'>
                                <ChangeBookSettings bookID={book.id} title={book.title} author={book.author} 
                                    price={book.price} cover={book.cover}></ChangeBookSettings>
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
                
                <div>
                    <AddNewBook onAdd={addBook}></AddNewBook>
                </div>

            </div>
      
        
    )
}

export default AdminSettings;