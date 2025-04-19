import React, { useContext } from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { BooksContext } from '../context/BooksContext';
import '../style/loginForm.css'
import '../style/all.css'
import { userDataInitialState } from '../reducers/loginReducer';

const AddNewBook = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [isTitleinputValid, setIsTitleInputValid] = useState(true);
    const [isAuthorinputValid, setIsAuthorInputValid] = useState(true);
    const [isPriceinputValid, setIsPriceInputValid] = useState(true);
    const {dispatchBooksData} = useContext(BooksContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [nextId, setNextId] = useState(9);

    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
    });
  
    useEffect(() => {
        if (errorMessage !== "") {
            setErrorMessage(errorMessage);
        }
    }, [errorMessage]);

    const navigate = useNavigate();

    const isFormInavlid = () => {
        return title === "" || author === "" || price === "";
    };

    const onBlurTitleInput = (event) => {
        const theTitle = event.target.value.trim();
        if (theTitle === "") {
            setTitle("");
            setIsTitleInputValid(false);
        } else {
            setTitle(theTitle);
            setIsTitleInputValid(true);
        }
    };
    const onBlurAuthorInput = (event) => {
        const theAuthor = event.target.value.trim();
        if (theAuthor === "") {
            setAuthor("");
            setIsAuthorInputValid(false);
        } else {
            setAuthor(theAuthor);
            setIsAuthorInputValid(true);
        }
    };
    const onBlurPriceInput = (event) => {
        const thePrice = event.target.value.trim();
        if (thePrice === "") {
            setPrice("");
            setIsPriceInputValid(false);
        } else {
            setPrice(thePrice);
            setIsPriceInputValid(true);
        }
    };

    const onSubmitform = async (event) => {
        event.preventDefault(); 
        try{
            const response = await fetch(`http://localhost:3000/books`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'token': userData.token
                },
                body: JSON.stringify({ 
                    'bookId': nextId,
                    'title': title,
                    'author': author,
                    'price': price,
                    'cover': '/general_book.jpg',
                    'description': 'general description'
                })
            })
            const data = await response.json();
            setNextId(nextId+1);
            onAdd();
            console.log("added new book")
        }
        catch(error){
            console.error('Error:', error);
        } 
    };

    return (
      <div className="login-form-container">
        <h2>Add New Book</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={onSubmitform} className='login-form'>
             <input placeholder="Title" onBlur={ onBlurTitleInput } className='form-input' />
            { !isTitleinputValid && <div className="invalid-message">You must enter the title.</div> }
            <input type="text" placeholder="Author" onBlur={ onBlurAuthorInput } className='form-input'/>
            { !isAuthorinputValid && <div className="invalid-message">You must enter the author.</div> }
            <input type="text" placeholder="Price" onBlur={ onBlurPriceInput } className='form-input'/>
            { !isPriceinputValid && <div className="invalid-message">You must enter the price.</div> }
            <div className="login-form__nav">
            <button type="submit"  disabled={ isFormInavlid() } className='form-button'>Submit</button>
        </div>
         
        </form>
      </div>
    );
}
export default AddNewBook;