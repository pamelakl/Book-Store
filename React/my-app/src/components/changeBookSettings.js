import React, { useState, useEffect } from 'react';
import '../style/books.css';
import { userDataInitialState } from '../reducers/loginReducer';
import { useNavigate } from 'react-router-dom';

const ChangeBookSettings = ({ bookID, title, author, price, cover, onBookUpdate }) => {
    const [userData] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
    });

    const [newTitle, setNewTitle] = useState(title);
    const [newAuthor, setNewAuthor] = useState(author);
    const [newPrice, setNewPrice] = useState(price);

    const [isTitleValid, setIsTitleValid] = useState(true);
    const [isAuthorValid, setIsAuthorValid] = useState(true);
    const [isPriceValid, setIsPriceValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        if(!userData?.user?.admin)
            navigate('/');
    }, [userData])

    const updateBookField = async (fieldName, fieldValue) => {
        try {
            const response = await fetch(`http://localhost:3000/books/${bookID}`, {
                method: 'PATCH',
                headers: {
                    'token': userData.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    [fieldName]: fieldValue,
                }),
            });

            const data = await response.json();

            switch (fieldName) {
                case 'title':
                    setNewTitle(data.data.book.updatedBook.title);
                    break;
                case 'author':
                    setNewAuthor(data.data.book.updatedBook.author);
                    break;
                case 'price':
                    setNewPrice(data.data.book.updatedBook.price);
                    break;
                default:
                    console.error(`Unknown field update: ${fieldName}`);
            }

            onBookUpdate();
            
        } catch (error) {
            console.error(`Error updating ${fieldName}:`, error);
            setErrorMessage(`Failed to update ${fieldName}.`);
        }
    };

    const handleTitleSubmit = (e) => {
        e.preventDefault();
        if (!userData?.user?.admin) {
            alert("User must be an admin to make changes.");
            return;
        }
        if (newTitle.trim() === "") {
            setIsTitleValid(false);
            return;
        }
        setIsTitleValid(true);
        updateBookField("title", newTitle.trim());
    };

    const handleAuthorSubmit = (e) => {
        e.preventDefault();
        if (!userData?.user?.admin) {
            alert("User must be an admin to make changes.");
            return;
        }
        if (newAuthor.trim() === "") {
            setIsAuthorValid(false);
            return;
        }
        setIsAuthorValid(true);
        updateBookField("author", newAuthor.trim());
    };

    const handlePriceSubmit = (e) => {
        e.preventDefault();
        if (!userData?.user?.admin) {
            alert("User must be an admin to make changes.");
            return;
        }
        if (newPrice === "" || isNaN(newPrice) || Number(newPrice) < 0) {
            setIsPriceValid(false);
            return;
        }
        setIsPriceValid(true);
        updateBookField("price", newPrice);
    };

    return (
        <div className="change-book-settings-container">
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleTitleSubmit} className='change-book-form'>
                <div>New Title:</div>
                <input
                    onChange={(e) => setNewTitle(e.target.value)}
                    className='books-form-input'
                />
                <div className="login-form__nav">
                    <button type="submit" disabled={newTitle.trim() === ""} className='books-form-button'>
                        Change Book Title
                    </button>
                </div>
                {!isTitleValid && <div className="invalid-message">Invalid title</div>}
            </form>

            <form onSubmit={handleAuthorSubmit} className='change-book-form'>
                <div>New Auther:</div>
                <input
                 //   placeholder="New Book Author"
                  //  value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className='books-form-input'
                />
                <div className="login-form__nav">
                    <button type="submit" disabled={newAuthor.trim() === ""} className='books-form-button'>
                        Change Book Author
                    </button>
                </div>
                {!isAuthorValid && <div className="invalid-message">Invalid author</div>}
            </form>

            <form onSubmit={handlePriceSubmit} className='change-book-form'>
                <div>New Price:</div>   
                <input
                    onChange={(e) => setNewPrice(e.target.value)}
                    className='books-form-input'
                />
                <div className="login-form__nav">
                    <button
                        type="submit"
                        disabled={newPrice === "" || isNaN(newPrice) || Number(newPrice) < 0}
                        className='books-form-button'
                    >
                        Change Book Price
                    </button>
                </div>
                {!isPriceValid && <div className="invalid-message">Invalid price</div>}
            </form>
        </div>
    );
};

export default ChangeBookSettings;
