import React from 'react';
import { CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";
import { useContext } from 'react';
import SearchBar from './searchBar';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import { logoutAction } from '../actions/loginActions';
import { CiLogout } from "react-icons/ci";

function Header(){
    const {userData, dispatchUserData} = useContext(LoginContext);
    const history = useNavigate();

    const onClickLogout = () => {
        dispatchUserData(logoutAction());
        history.push("/");
    }

    return (
        <div className='header'>
          <div className='icons'> 
            <div className="page_header_costumer">
                {
                    !!userData.user?
                    <div onClick={()=> onClickLogout}>
                        <CiLogout size={23}/>
                    </div> : 
                    <Link to={'/connect'} >
                        <CiUser className='costumer-icon' size={23}/>
                    </Link>
                }
            </div>
            <div className="page_header_likes">
                <Link to={'/likedBooks'} >
                    <CiHeart className='heart-icon' size={23}/>
                </Link>
            </div>
            <div className='page_header_minicart'>
                <Link to={'/cart'} >
                    <CiShoppingCart className='minicart-icon' size={23}/>
                </Link>
            </div>
          </div>
          <SearchBar ></SearchBar>
          <Link to={'/'}>
            <img className="logo" src="https://www.steimatzky.co.il/pub/media/idus/default/steimetzky_newlogo_2.svg"></img>
          </Link>
        </div>
        
    )
}
export default Header;