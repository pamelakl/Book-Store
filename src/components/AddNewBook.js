import React, { useContext } from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { BooksContext } from '../context/BooksContext';
import '../style/loginForm.css'
import '../style/all.css'
import { addNewBookAction } from '../actions/booksActions';

const AddNewBook = (props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [isTitleinputValid, setIsTitleInputValid] = useState(true);
    const [isAuthorinputValid, setIsAuthorInputValid] = useState(true);
    const [isPriceinputValid, setIsPriceInputValid] = useState(true);
    const {dispatchBooksData} = useContext(BooksContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [nextId, setNextId] = useState(9);
  
    useEffect(() => {
        if (props.errorMessage !== "") {
            setErrorMessage(props.errorMessage);
        }
    }, [props.errorMessage]);

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

    const onSubmitform = (event) => {
      //  console.log("adding new book")
        event.preventDefault();
        const newBook = {
            id: nextId,
            title,
            author,
            price,
            cover: '/general_book.jpg', // Add a default cover or make this an input
        };
        dispatchBooksData(addNewBookAction({
            nextId,
            title,
            author,
            price,
        })) 
        setNextId(nextId+1);
        props.onAdd(newBook);
        console.log("adding new book")
        //    : alert("Please log in to like a book.");
        
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