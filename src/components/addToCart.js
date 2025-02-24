import React, { useContext, useState } from 'react';
import { BooksContext } from '../context/BooksContext';
import { LoginContext } from '../context/LoginContext';
import { CiShoppingCart } from "react-icons/ci";
import '../style/books.css'
import { addBookToCartAction } from '../actions/booksActions';
import { userDataInitialState } from '../reducers/loginReducer';


const AddToCart = ({bookID, title, author, price, cover}) =>{
    const { dispatchBooksData } = useContext(BooksContext);
   // const { userData } = useContext(LoginContext);
     const [userData, setUserData] = useState(() => {
            const storedUserData = localStorage.getItem('userData');
            return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
        });

    const user = userData.user;

    const onSubmit = (event) => {
        event.stopPropagation();
        if(!!userData.user){
            dispatchBooksData(addBookToCartAction({
                bookID,
                title,
                author,
                price,
                cover,
                user
            })) ;
            alert(`"${title}" has been added to your cart!`);
        }
        else{
            alert("Please log in to like a book.");
        }
            
    }
    return(
        <div>
            <CiShoppingCart onClick={onSubmit} size={25}/>
        </div>
    )
}

export default AddToCart;