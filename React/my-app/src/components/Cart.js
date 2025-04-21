import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/LoginContext';
import { BooksContext } from '../context/BooksContext';
import { Navigate } from 'react-router-dom';
import { CiCircleRemove } from "react-icons/ci";
import { removeBookFromCartAction } from '../actions/booksActions';
import '../style/books.css'
import { userDataInitialState } from '../reducers/loginReducer';


function Cart(){
     const [userData, setUserData] = useState(() => {
            const storedUserData = localStorage.getItem('userData');
            return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
        });
    const {dispatchBooksData} = useContext(BooksContext);
    const [totalToPay, setTotalToPay] = useState(0);

    const [booksInCart, setBooksInCart] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    if (!userData?.user) {
        return <Navigate to="/connect" replace />;
    }

    async function fetchBooks(){
        try{
            const response = await fetch(`http://localhost:3000/books/cart`,{
                headers: {
                    'Content-Type': 'application/json',
                    'token': userData.token
                }
            }) 
            const data = await response.json();
            const booksInCart = data.data;
            setBooksInCart(data.data);
            const totalToPay = booksInCart.reduce((acc, book) => {
                return acc + Number(book.price)
            }, 0);
            setTotalToPay(totalToPay);
        }
        catch(error){
            console.error("Error fetching books:", error)
        }
    }


    const removeBook = async (book) => {
        try{
            const response = await fetch(`http://localhost:3000/books/cart`, {
                method: 'DELETE',
                headers: {
                    'token': userData.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'bookId': book._id
                })
                
            })
            fetchBooks();
        }
        catch(error){
            console.error('Error:', error);
        }
    }


    return (
        <div className='book-section'>
            <div className='books'>
                {booksInCart
                .map((book,i)=>(
                    <div className='book'>
                        <img key={`img-${i}`} src={book.cover} className='book-cover'></img>
                        <div key={`book-name-${i}`} className='liked-book-name'>{`${book.title}` }</div>
                        <div key={`book-author-${i}`} className='liked-book-author'>{`${book.author}`}</div>
                        <div key={`book-price-${i}`} className='liked-book-price'>{`${book.price}`}</div>
                        <div className='remove-liked-book' onClick={() => {removeBook(book) }} >
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