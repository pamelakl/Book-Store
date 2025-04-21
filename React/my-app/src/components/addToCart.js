import React, { useState } from 'react';
import { CiShoppingCart } from "react-icons/ci";
import '../style/books.css'
import { userDataInitialState } from '../reducers/loginReducer';


const AddToCart = ({bookID, title, author, price, cover}) =>{
     const [userData, setUserData] = useState(() => {
            const storedUserData = localStorage.getItem('userData');
            return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
        });


    const onSubmit =  async (event) => {
        event.stopPropagation();
        if(!!userData?.user){
            try{
                const response = await fetch(`http://localhost:3000/books/cart`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'token': userData.token
                    },
                    body: JSON.stringify({ 
                        'bookId': bookID,
                        'title': title,
                        'author': author,
                        'price': price,
                        'cover': cover
                    })
                })
            }
            catch(error){
                console.error('Error:', error)
            }
            alert(`"${title}" has been added to your cart!`);
        }
        else{
            alert("Please log to add to cart.");
        }
            
    }
    return(
        <div>
            <CiShoppingCart onClick={onSubmit} size={25}/>
        </div>
    )
}

export default AddToCart;