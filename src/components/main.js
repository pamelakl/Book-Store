import React from 'react';
import Books from './books'
import '../style/searchBar.css';
import '../style/all.css';

function Main(){
    return (
        <div>
            <div className='info_bar'></div>
            <Books></Books>
        </div>
    )
}

export default Main;