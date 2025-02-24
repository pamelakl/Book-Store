import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/LoginContext';
import { BooksContext } from '../context/BooksContext';
import { Navigate } from 'react-router-dom';
import { CiCircleRemove } from "react-icons/ci";
import { removeBookFromCartAction } from '../actions/booksActions';
import '../style/books.css'
import { userDataInitialState } from '../reducers/loginReducer';


function Cart(){
   // const {userData} = useContext(LoginContext);
     const [userData, setUserData] = useState(() => {
            const storedUserData = localStorage.getItem('userData');
            return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
        });
    const {dispatchBooksData} = useContext(BooksContext);
    const [totalToPay, setTotalToPay] = useState(0);
    
    useEffect(()=>{
        if(userData?.user){
            setTotalToPay(
            (JSON.parse(localStorage.getItem('addedToCart')))
                .reduce((acc, book) => acc + (book.user.id === userData.user.id ? Number(book.price) : 0), 0))
        }
    },[localStorage.getItem('addedToCart')])

    if (!userData?.user) {
        return <Navigate to="/connect" replace />;
    }

    const user = userData.user;

    const removeBook = (book) => {
        dispatchBooksData(removeBookFromCartAction({
            book,
            user
        })) 
    }


    return (
        <div className='book-section'>
            <div className='books'>
                {((JSON.parse(localStorage.getItem('addedToCart'))))
                .filter((book)=>book.user.id === userData.user.id)
                .map((book,i)=>(
                    <div className='book'>
                        <img key={`img-${i}`} src={book.cover} className='book-cover'></img>
                        <div key={`book-name-${i}`} className='liked-book-name'>{`${book.title}` }</div>
                        <div key={`book-author-${i}`} className='liked-book-author'>{`${book.author}`}</div>
                        <div key={`book-price-${i}`} className='liked-book-price'>{`${book.price}`}</div>
                        <div className='remove-liked-book' onClick={() => removeBook(book)}>
                            <CiCircleRemove size={25}/>
                        </div>
                    </div>
                ))}
            </div>
            <div className='total'>
                <h3>Total To Pay</h3>
                <div>{totalToPay}</div>
            </div>
            
        </div>
    )
}
export default Cart;