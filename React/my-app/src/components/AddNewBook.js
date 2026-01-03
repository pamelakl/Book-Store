import React from 'react';
import {useState, useEffect} from 'react';
import '../style/books.css'
import '../style/all.css'
import { userDataInitialState } from '../reducers/loginReducer';

const AddNewBook = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [isTitleinputValid, setIsTitleInputValid] = useState(true);
    const [isAuthorinputValid, setIsAuthorInputValid] = useState(true);
    const [isPriceinputValid, setIsPriceInputValid] = useState(true);
    const [isPhotoinputValid, setIsPhotoInputValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
    });
  
    useEffect(() => {
        if (errorMessage !== "") {
            setErrorMessage(errorMessage);
        }
    }, [errorMessage]);

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
    const handleFileChange = (e) => {
        const photo = e.target.files[0];
        if(!photo){
            setFile(null);
            setIsPhotoInputValid(false);
        } else{
            setFile(photo);
            setIsPhotoInputValid(true);
        }
    };

    const onSubmitform = async (event) => {
        event.preventDefault(); 
        const formData = new FormData();

        if (!file) {
            setIsPhotoInputValid(false);
            return;
        }

       console.log(file);
        formData.append('title', title);
        formData.append('author', author);
        formData.append('price', price);
        formData.append('cover', file);
        formData.append('description', 'general description');
        try{
            const response = await fetch(`http://localhost:3000/books`, {
                method: 'POST',
                headers: {
                    'token': userData.token
                },
                body: formData
            })
            const data = await response.json();
            onAdd();
        }
        catch(error){
            console.error('Error:', error);
        } 
    };

    return (
      <div className="change-book-settings-container">
        <h2>Add New Book</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={onSubmitform} className='login-form'>
             <input placeholder="Title" onBlur={ onBlurTitleInput } className='form-input' />
            { !isTitleinputValid && <div className="invalid-message">You must enter the title.</div> }
            <input type="text" placeholder="Author" onBlur={ onBlurAuthorInput } className='form-input'/>
            { !isAuthorinputValid && <div className="invalid-message">You must enter the author.</div> }
            <input type="text" placeholder="Price" onBlur={ onBlurPriceInput } className='form-input'/>
            { !isPriceinputValid && <div className="invalid-message">You must enter the price.</div> }
            <input type="file" onChange={handleFileChange} />
            {/* <button type="submit">Upload Photo</button> */}
            { !isPhotoinputValid && <div className="invalid-message">You must enter a photo.</div> }
            <div className="login-form__nav">
                <button type="submit"  disabled={ isFormInavlid() } className='form-button'>Submit</button>
        </div>
         
        </form>
      </div>
    );
}
export default AddNewBook;