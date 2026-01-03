import '../style/searchBar.css';
import '../style/all.css';
import { CiSearch } from "react-icons/ci";
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { debounce } from 'lodash'; 

function SearchBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const getSearchTermFromPath = (pathname) => {
        if (pathname.startsWith('/SearchBooks/')) {
            return decodeURIComponent(pathname.substring('/SearchBooks/'.length));
        }
        return '';
    };

    const [searchTerm, setSearchTerm] = useState(() => getSearchTermFromPath(location.pathname));

    const debouncedNavigate = useCallback(
        debounce((term) => {
            const trimmedTerm = term.trim();
            const currentPath = location.pathname; 

            if (trimmedTerm) {
                const targetPath = `/SearchBooks/${encodeURIComponent(trimmedTerm)}`;
                 if (currentPath !== targetPath) {
                    console.log("Navigating to:", targetPath);
                    navigate(targetPath);
                }
            } else {
                if (currentPath.startsWith('/SearchBooks')) {
                    console.log("Navigating to: /");
                    navigate('/');
                }
            }
        }, 500), 
        [navigate, location.pathname] 
    );

    useEffect(() => {
        debouncedNavigate(searchTerm);

        return () => {
            debouncedNavigate.cancel(); 
        };
    }, [searchTerm, debouncedNavigate]);

    useEffect(() => {
        const termFromPath = getSearchTermFromPath(location.pathname);
        if (searchTerm !== termFromPath) {
             console.log("Syncing URL to input:", termFromPath);
             setSearchTerm(termFromPath);
        }
    }, [location.pathname]); 


    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <form className="header-search-input-wrapper" onSubmit={handleSubmit}>
                <input
                    className='search-bar'
                    type="text"
                    value={searchTerm}
                    placeholder="חפשו לפי ספר / שם מחבר/ת...?"
                    maxLength="128"
                    autoComplete="off"
                    title="חיפוש"
                    aria-label="חיפוש"
                    onChange={handleInputChange}
                />
                <div className="search-button-wrapper">
                    <button className="submit-search" type="submit" title="חיפוש">
                        <CiSearch size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;


