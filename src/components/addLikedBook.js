import React, { useContext } from 'react';
import { BooksContext} from '../context/BooksContext';
import { LoginContext } from '../context/LoginContext';
import { CiHeart } from "react-icons/ci";
import '../style/books.css'
import { addLikedBookAction } from '../actions/booksActions';


const AddLikedBook = ({bookID, title, author, price, cover}) =>{
    const { dispatchBooksData } = useContext(BooksContext);
    const { userData } = useContext(LoginContext);

    const user = userData.user;

    const addLikedBook = () => {
        console.log("before:")
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