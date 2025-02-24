import React, { useContext, useState } from 'react';
import { BooksContext} from '../context/BooksContext';
import { LoginContext } from '../context/LoginContext';
import '../style/books.css'
import { changeBookSettingsAction } from '../actions/booksActions';
import { userDataInitialState } from '../reducers/loginReducer';


const ChangeBookSettings = ({bookID, title, author, price, cover}) =>{
    const { dispatchBooksData } = useContext(BooksContext);
   // const { userData } = useContext(LoginContext);
     const [userData, setUserData] = useState(() => {
            const storedUserData = localStorage.getItem('userData');
            return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
        });
    const user = userData.user;
    const [name, setName] = useState(title);
    const [bookAuthor, setAuthor] = useState(author);
    const [bookPrice, setPrice] = useState(price);
    const [isNameinputValid, setIsNameInputValid] = useState(true);
    const [isAuthorInputValid, setIsAuthorInputValid] = useState(true);
    const [isPriceInputValid, setIsPriceInputValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

   const isNameFormInavlid = () => {
        return name === "";
    };

    const isAuthorFormInavlid = () => {
        return author === "";
    };

    const isPriceFormInavlid = () => {
        return price === "" || Number(price)<0;
    };

    const onBlurNameInput = (event) => {
        const theName = event.target.value.trim();
        if (theName === "") {
            setName("");
            setIsNameInputValid(false);
        } else {
            setName(theName);
            setIsNameInputValid(true);
        }
    };

    const onBlurAuthorInput = (event) => {
        const theAuthor = event.target.value.trim();
        if (theAuthor === "" ) {
            setAuthor("");
            setIsAuthorInputValid(false);
        } else {
            setAuthor(theAuthor);
            setIsAuthorInputValid(true);
        }
    };

    const onBlurPriceInput = (event) => {
        const thePrice = event.target.value.trim();
        if (thePrice === "" || Number(price)<0) {
            setPrice("");
            setIsPriceInputValid(false);
        } else {
            setPrice(thePrice);
            setIsPriceInputValid(true);
        }
    };

    const onSubmit = (event) => {
        event.stopPropagation();
        !!userData.admin?
            dispatchBooksData(changeBookSettingsAction({
                bookID,
                name,
                bookAuthor,
                bookPrice,
                cover
           //     user
            })) :
            alert("user must be an admin to make changes");

     //   console.log((JSON.parse(localStorage.getItem('likedBooks'))));
    }
    return(
        <div>
             <div className="change-book-settings-container">
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <form onSubmit={onSubmit} className='change-book-form'>
                    <input placeholder="New Book Name" onBlur={ onBlurNameInput } className='books-form-input' />
                    <div className="login-form__nav">
                        <button type="submit"  disabled={ isNameFormInavlid() } className='books-form-button'>Change Book Name</button>
                    </div>
                    { !isNameinputValid && <div className="invalid-message">invalid name</div> }
                </form>
                <form onSubmit={onSubmit} className='change-book-form'>
                    <input placeholder="New Book Author" onBlur={ onBlurAuthorInput } className='books-form-input' />
                    <div className="login-form__nav">
                        <button type="submit"  disabled={ isAuthorFormInavlid() } className='books-form-button'>Change Book Author</button>
                    </div>
                    { !isNameinputValid && <div className="invalid-message">invalid author</div> }
                </form>
                <form onSubmit={onSubmit} className='change-book-form'>
                    <input placeholder="New Book Price" onBlur={ onBlurPriceInput } className='books-form-input' />
                    <div className="login-form__nav">
                        <button type="submit"  disabled={ isPriceFormInavlid() } className='books-form-button'>Change Book Price</button>
                    </div>
                    { !isNameinputValid && <div className="invalid-message">invalid price</div> }
                </form>
            </div>
        </div>
    )
}

export default ChangeBookSettings;