import '../style/books.css';
import React, {  useEffect } from 'react';
import { useState } from 'react';
import '../style/books.css'
import { useNavigate } from 'react-router-dom';
import ChangeBookSettings from './changeBookSettings';
import { CiCircleRemove } from "react-icons/ci";
import AddNewBook from './AddNewBook';
import { userDataInitialState } from '../reducers/loginReducer';
import { FaRegEdit } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";


function AdminSettings(){
    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
    });

    const navigate = useNavigate()

    const [selectedBookId, setSelectedBookId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [books, setBooks] = useState([]);
    const[pageNumber, setPageNumber] = useState(1);
    const[currentBooks, setCurrentBooks] = useState(books.slice((pageNumber - 1) * 12, Math.min(pageNumber * 12, books.length)));

    const handleEditClick = (book) => {
        setSelectedBookId(book._id);
        setIsModalOpen(true);
        setEditingBook(book);
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    }

    const handleClose = () => {
        setSelectedBookId(null);
        setIsModalOpen(false);
        setEditingBook(null);
    };

    if(!userData?.user?.admin){
        navigate('/')
    }

    useEffect(() => {
        refetchBooks();
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

    const totalPages = books.length%12 === 0 ? books.length/12 : (books.length/12)+1
    
    useEffect(()=>{
        setCurrentBooks(books.slice((pageNumber - 1) * 12, Math.min(pageNumber * 12, books.length)));
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
                <button onClick={() => handleAddClick()} className='new-book-button' title="Add Book"> 
                    <IoIosAddCircleOutline size={30} />
                    <span>Add New Book</span>  
                </button>
                <div>
                    <div className='books'>
                    {currentBooks.map((book,i)=>(
                        <div>
                            <div className='book'>
                                <img key={`img-${i}`} src={`http://localhost:3000/${book.cover}`} className='book-cover'></img>
                                <div key={`book-name-${i}`} className='liked-book-name'>{`${book.title}` }</div>
                                <div key={`book-author-${i}`} className='liked-book-author'>{`${book.author}`}</div>
                                <div key={`book-price-${i}`} className='liked-book-price'>{`${book.price}`}</div>
                                <div className='admin-settings'> 
                                    <button onClick={() => removeBook(book)} className='settings-button' title="Remove Book"> 
                                        <CiCircleRemove size={20}  className='remove-book'></CiCircleRemove>
                                    </button>
                                    <button onClick={() => handleEditClick(book)}  className='settings-button' title="Edit Book"> 
                                        <FaRegEdit size={20} className='change-book-settings'/>
                                    </button>
                                 
                                </div>
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
                {isModalOpen && selectedBookId && (
                            <ChangeBookSettings book={editingBook} onBookUpdate={() => {refetchBooks();}} handleClose={handleClose}/>
                )}

                {isModalOpen && !selectedBookId && (
                    <div className="modal-overlay" onClick={handleClose}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <AddNewBook onAdd={refetchBooks}></AddNewBook>
                            <button onClick={handleClose} className="close-modal-button">X</button>
                        </div>
                    </div>
                )}      

            </div>
    )
}

export default AdminSettings;