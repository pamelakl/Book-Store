import React, { useState, useEffect, useContext } from 'react';
import {useParams } from 'react-router-dom';
import '../style/books.css'

const BookInfo = (props) => {
    const {bookId} = useParams();

    const desctiption = "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!";

    const [bookToDisplay, setBookToDisplay] = useState(null);

    async function fetchBook(){
        try{
            const response = await fetch(`http://localhost:3000/books/${bookId}`,{
                headers: {
                    'Content-Type': 'application/json'
                }
            }) 
            const data = await response.json();
            setBookToDisplay(data.data.book);
            
        }
        catch(error){
            console.error("Error fetching book:", error)
        }
    }
    
    useEffect(()=>{
        fetchBook();;
    }, [bookId])

    if (!bookToDisplay) {
        return <p>Book not found or loading...</p>;
    }

    return(
        <div className='book-div'>
            <div class='book-info'>
                <div className='book-info-name'>{`${bookToDisplay.title}` }</div>
                <div className='book-info-author'>{`${bookToDisplay.author}`}</div>
                <div className='book-info-desc'>{`${desctiption}`}</div>
            </div>
            <img src={bookToDisplay.cover} className='book-info-cover'></img>
        </div>
    )
}

export default BookInfo;