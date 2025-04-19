import '../style/books.css';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import '../style/books.css'
import { useNavigate } from 'react-router-dom';
import ChangeBookSettings from './changeBookSettings';
import { CiCircleRemove } from "react-icons/ci";
import AddNewBook from './AddNewBook';
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

    const [books, setBooks] = useState([]);

    useEffect(() => {
        refetchBooks();
        // fetch("http://localhost:3000/books")
        //   .then(response => response.json())
        //   .then(data => 
        //     {   
                
        //         setBooks(data.data.books);
        //     })
        //   .catch(error => console.error("Error fetching books:", error));
      }, []);

    async function refetchBooks(){
        try{
            const response = await fetch("http://localhost:3000/books");
            const data = await response.json();
            setBooks(data.data.books);
        }
        catch(error){
            console.error("Error fetching books:", error);
        }
    }

    const[pageNumber, setPageNumber] = useState(1);

    const totalPages = books.length%3 === 0 ? books.length/3 : (books.length/3)+1

    const[currentBooks, setCurrentBooks] = useState(books.slice((pageNumber - 1) * 3, Math.min(pageNumber * 3, books.length)));

    useEffect(()=>{
        setCurrentBooks(books.slice((pageNumber - 1) * 3, Math.min(pageNumber * 3, books.length)));
    },[pageNumber, books])

    function handlePageClick(index){
        setPageNumber(index);
    }

    const removeBook = async (book) => {
        try{
            const response = await fetch(`http://localhost:3000/books/${book._id}`, {
                method: 'DELETE',
                headers: {
                    'token': userData.token
                }
            })
            const data = await response.json();
            refetchBooks();
        }
        catch(error){
            console.error('Error:', error);
        }

    }

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
                                <ChangeBookSettings bookID={book._id} title={book.title} author={book.author} 
                                    price={book.price} cover={book.cover} onBookUpdate={refetchBooks}></ChangeBookSettings>
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
                    <AddNewBook onAdd={refetchBooks}></AddNewBook>
                </div>

            </div>
      
        
    )
}

export default AdminSettings;