import React, { useEffect } from 'react';
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { useContext, useState } from 'react';
import SearchBar from './searchBar';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import { logoutAction } from '../actions/loginActions';
import { CiLogout } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { userDataInitialState } from '../reducers/loginReducer';
import '../style/header.css';


function Header(){
    const {dispatchUserData} = useContext(LoginContext);
     const [userData, setUserData] = useState(() => {
            const storedUserData = localStorage.getItem('userData');
            return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
        });

    useEffect(()=>{
        const storedUserData = localStorage.getItem('userData');
        storedUserData ? setUserData(JSON.parse(storedUserData)) : setUserData(userDataInitialState);
    }, [localStorage.getItem('userData')])

    const navigate = useNavigate();

    const onClickLogout = () => {
        dispatchUserData(logoutAction());
        navigate("/");
    }

    return (
        <div className='header'>
          <div className='icons'> 
            <div className="page_header_costumer">
                {
                    !!userData.user?
                    <div>
                        <CiLogout size={23} className='icon' onClick={()=>onClickLogout()}/>
                    </div> : 
                    <Link to={'/connect'} >
                        <CiUser className='icon' size={23}/>
                    </Link>
                }
            </div>
          
            <div className='page_header_minicart'>
                {
                    !!userData.user?
                    <Link to={'/cart'} >
                        <CiShoppingCart className='icon' size={23}/>
                    </Link> :
                    <Link to={'/connect'} >
                        <CiShoppingCart className='icon' size={23}/>
                    </Link>
                }
                
            </div>
            <div className='page_header_settings'>
            {
                !!userData.user?
                <div>
                    <Link to={'/Settings'}>
                        <IoIosSettings size={23} className='icon'/>
                    </Link>
                </div>:
                <div></div>
            }
            </div>
            <div className='page_header_admin'>
                <Link to={'/AdminLogin'}>
                    <MdAdminPanelSettings className='icon' size={23}/>
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