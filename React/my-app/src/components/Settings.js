import React, { useContext } from 'react';
import {useState, useEffect} from 'react';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import { loginAction, logoutAction } from '../actions/loginActions';
import { changeInfo, deleteAccount } from '../server/auth';
import '../style/loginForm.css'
import '../style/all.css'
import { userDataInitialState } from '../reducers/loginReducer';

const Settings = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailinputValid, setIsEmailInputValid] = useState(true);
    const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
    const {dispatchUserData} = useContext(LoginContext);

     const [userData, setUserData] = useState(() => {
            const storedUserData = localStorage.getItem('userData');
            return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
    });

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    if(!userData?.user){
        navigate('/')
    }

    useEffect(()=>{
        if(!userData?.user)
            navigate('/');
    }, [userData])
  
    useEffect(() => {
        if (props.errorMessage !== "") {
            setErrorMessage(props.errorMessage);
        }
    }, [props.errorMessage]);

    const isEmailFormInavlid = () => {
        return email === "";
    };

    const isPasswordFormInavlid = () => {
        return password === "";
    };

    const onBlurEmailInput = (event) => {
        const theEmail = event.target.value.trim();
        if (theEmail === "") {
            setEmail("");
            setIsEmailInputValid(false);
        } else {
            setEmail(theEmail);
            setIsEmailInputValid(true);
        }
    };

    const onBlurPasswordInput = (event) => {
        const thePassword = event.target.value.trim();
        setPassword(thePassword === "" ? "" : thePassword);
        setIsPasswordInputValid(thePassword !== "");
    };

    const onSubmitEmail = (event) => {
        event.preventDefault();
        changeInfo(userData.user._id, 'email', email, userData.token).then(
            (userData) => {
                dispatchUserData(loginAction(userData));
                alert("Email changed");
            },
            (err) => {
                setErrorMessage(err.message);
            }
        )

    };

    const onSubmitPassword = (event) => {
        event.preventDefault();
        changeInfo(userData.user._id, 'password', password, userData.token).then(
            (userData) => {
                const token = userData.token;
                dispatchUserData(loginAction({token, userData}));
                alert("Password changed");
            },
            (err) => {
                setErrorMessage(err.message);
            }
        )

    };

    function onDeleteAccount(){
        deleteAccount(userData.user._id, userData.token).then(
            ()=>{
                dispatchUserData(logoutAction())
                navigate('/');
            },
            (err)=>{
                setErrorMessage(err.message);
            }
        )
    }

    return (
      <div className="change-settings-container">
        <h1>Change Account Settings</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={onSubmitEmail} className='change-email-form'>
             <input placeholder="Email" onBlur={ onBlurEmailInput } className='form-input' />
            <div className="login-form__nav">
                <button type="submit"  disabled={ isEmailFormInavlid() } className='settings-form-button'>Change email</button>
            </div>
            { !isEmailinputValid && <div className="invalid-message">invalid email</div> }
        </form>

        <form onSubmit={onSubmitPassword} className='change-password-form'>
            <input type="password" placeholder="Password" onBlur={ onBlurPasswordInput } className='form-input'/>
            <div className="login-form__nav">
                <button type="submit"  disabled={ isPasswordFormInavlid() } className='settings-form-button'>Change password</button>
            </div>
            { !isPasswordInputValid && <div className="invalid-message">invalid password.</div> }
        </form>
        
        <div className="login-form__nav">
            <button type="submit" onClick={()=>onDeleteAccount()} className='form-button'>Delete account</button>
        </div>
        

      </div>
    );
}
export default Settings;