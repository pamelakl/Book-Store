import React, { useContext } from 'react';
import { BooksContext} from '../context/BooksContext';
import { LoginContext } from '../context/LoginContext';
import { CiHeart } from "react-icons/ci";
import '../style/books.css'
import { addLikedBookAction } from '../actions/booksActions';
import { useState } from 'react';
import { userDataInitialState } from '../reducers/loginReducer';
 

const AddLikedBook = ({bookID, title, author, price, cover}) =>{
    const { dispatchBooksData } = useContext(BooksContext);
   // const { userData } = useContext(LoginContext);
    const [userData, setUserData] = useState(() => {
           const storedUserData = localStorage.getItem('userData');
           return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
       });

    const user = userData.user;

    const addLikedBook = (event) => {
        event.stopPropagation();
        !!userData.user?
            dispatchBooksData(addLikedBookAction({
                bookID,
                title,
                author,
                price,
                cover,
                user
            })) :
            alert("Please log in to like a book.");

        console.log((JSON.parse(localStorage.getItem('likedBooks'))));
    }
    return(
        <div>
            <CiHeart onClick={addLikedBook} size={25}/>
        </div>
    )
}

export default AddLikedBook;