import React, { useState, useEffect } from 'react';
import '../style/books.css';
import { userDataInitialState } from '../reducers/loginReducer';
import { useNavigate } from 'react-router-dom';
import EditField from './EditField';

const ChangeBookSettings = ({ book, onBookUpdate, handleClose }) => {
    const [userData] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
    });

    const [newTitle, setNewTitle] = useState(book.title);
    const [newAuthor, setNewAuthor] = useState(book.author);
    const [newPrice, setNewPrice] = useState(book.price);

    const [isTitleValid, setIsTitleValid] = useState(true);
    const [isAuthorValid, setIsAuthorValid] = useState(true);
    const [isPriceValid, setIsPriceValid] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (!userData?.user?.admin) navigate('/');
    }, [userData]);

    const updateBookField = async (fieldName, fieldValue) => {
        try {
            const response = await fetch(`http://localhost:3000/books/${book._id}`, {
                method: 'PATCH',
                headers: {
                    'token': userData.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [fieldName]: fieldValue }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to update");

            switch (fieldName) {
                case 'title': setNewTitle(fieldValue); break;
                case 'author': setNewAuthor(fieldValue); break;
                case 'price': setNewPrice(fieldValue); break;
            }

            onBookUpdate();
        } catch (error) {
            console.error(`Error updating ${fieldName}:`, error);
            setErrorMessage(`Failed to update ${fieldName}.`);
        }
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="change-book-settings-container">
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                    <EditField
                        label="Title"
                        value={newTitle}
                        onChange={setNewTitle}
                        onSubmit={(val) => updateBookField("title", val)}
                        isValid={isTitleValid}
                        setIsValid={setIsTitleValid}
                        validate={(val) => val.trim() !== ""}
                    />

                    <EditField
                        label="Author"
                        value={newAuthor}
                        onChange={setNewAuthor}
                        onSubmit={(val) => updateBookField("author", val)}
                        isValid={isAuthorValid}
                        setIsValid={setIsAuthorValid}
                        validate={(val) => val.trim() !== ""}
                    />

                    <EditField
                        label="Price"
                        value={newPrice}
                        onChange={setNewPrice}
                        onSubmit={(val) => updateBookField("price", val)}
                        isValid={isPriceValid}
                        setIsValid={setIsPriceValid}
                        validate={(val) => val !== "" && !isNaN(val) && Number(val) >= 0}
                        type="number"
                    />
                </div>
                <button onClick={handleClose} className="close-modal-button">X</button>
            </div>
        </div>
    );
};

export default ChangeBookSettings;

