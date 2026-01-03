import React, { useState } from 'react';
import { CiCircleCheck } from "react-icons/ci";

const EditField = ({ 
    label, 
    value, 
    onChange, 
    onSubmit, 
    isValid, 
    setIsValid, 
    validate, 
    type = "text" }) => {
        
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate(value)) {
            setIsValid(false);
            return;
        }
        setIsValid(true);
        onSubmit(value);
    };

    return (
        <form onSubmit={handleSubmit} className='change-book-form'>
            <div>{label}:</div>
            <input 
                value={value} 
                onChange={(e) => onChange(e.target.value)} 
                className='books-form-input'
                type={type}
            />
            <div className="login-form__nav">
                <button type="submit" disabled={!validate(value)} className='settings-button'>
                    <CiCircleCheck size={23} />
                </button>
            </div>
            {!isValid && <div className="invalid-message">Invalid {label.toLowerCase()}</div>}
        </form>
    );
};

export default EditField;