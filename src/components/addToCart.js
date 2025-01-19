import React, { useContext } from 'react';
import { BooksContext, dispatchBooksData } from '../context/BooksContext';
import { LoginContext } from '../context/LoginContext';
import { CiShoppingCart } from "react-icons/ci";
import '../style/books.css'
import { addBookToCartAction } from '../actions/booksActions';


const AddToCart = ({bookID, title, author, price, cover}) =>{
    const { dispatchBooksData } = useContext(BooksContext);
    const { userData } = useContext(LoginContext);

    const onSubmit = () => {
        !!userData.user?
            dispatchBooksData(addBookToCartAction({
                bookID,
                title,
                author,
                price,
                cover
               // user: userData.user
            })) :
            alert("Please log in to like a book.");
    }
    return(
        <div>
            <CiShoppingCart onClick={onSubmit} size={25}/>
        </div>
    )
}

export default AddToCart;