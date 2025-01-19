import '../style/searchBar.css';
import '../style/all.css';
import { CiSearch } from "react-icons/ci";
import React from 'react';
import { useState } from 'react';

function SearchBar(){
    return (
        <div className="header-search-input-wrapper">					
                <input className='search-bar' type="text"  placeholder="חפשו לפי ספר / שם מחבר/ת...?"  maxlength="128" autocomplete="off" title="חיפוש" aria-label="חיפוש"></input>
                <div className="search-button-wrapper">
                    <button className="submit-search" type="submit" title="חיפוש">
                        <CiSearch size={20}/>
                    </button>
                </div>
            
        </div>
    )
}

export default SearchBar;
