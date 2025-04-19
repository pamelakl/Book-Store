import '../style/searchBar.css';
import '../style/all.css';
import { CiSearch } from "react-icons/ci";
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function SearchBar(){
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleNav = (event) =>{
        event.preventDefault();
        if(searchTerm.trim()){
            navigate(`/SearchBooks/${searchTerm.trim()}`);
        }
        
    }

    return (
        <div>
            <form  onSubmit={handleNav} className="header-search-input-wrapper">					
                <input className='search-bar' type="text" value={searchTerm} placeholder="חפשו לפי ספר / שם מחבר/ת...?"  maxlength="128" autocomplete="off" title="חיפוש" aria-label="חיפוש" onChange={(e)=>setSearchTerm(e.target.value)}></input>
                <div className="search-button-wrapper">
                    <button className="submit-search" type="submit" title="חיפוש">
                        <CiSearch size={20}/>
                    </button>
                </div>
            </form>
        </div>
        
    )
}

export default SearchBar;
