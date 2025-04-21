import React, { useContext } from 'react';
import {useState, useEffect} from 'react';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../actions/loginActions';
import { loginToSite } from '../server/auth';
import '../style/loginForm.css'
import '../style/all.css'

const AdminLogin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailinputValid, setIsEmailInputValid] = useState(true);
    const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
    const {dispatchUserData} = useContext(LoginContext);
    const [errorMessage, setErrorMessage] = useState("");
  
    useEffect(() => {
        if (props.errorMessage !== "") {
            setErrorMessage(props.errorMessage);
        }
    }, [props.errorMessage]);

    const user = JSON.parse(localStorage.getItem('userData'))
    
    const navigate = useNavigate();

    if(user?.user?.admin){
        navigate("/AdminSettings");
    }

    const isFormInavlid = () => {
        return email === "" || password === "";
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

    const onSubmitform = async (event) => {
        event.preventDefault();
        try{
            const userData = await loginToSite(email, password);
            if(userData?.user?.admin){
                dispatchUserData(loginAction(userData));
                navigate("/AdminSettings");
            }
            else{
                setErrorMessage("must be an admin");
                    
            }
        }
        catch(err){
            setErrorMessage(err.message);
        }
       
    };

    return (
      <div className="login-form-container">
        <h2>התחברות מנהל</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={onSubmitform} className='login-form'>
             <input placeholder="Email" onBlur={ onBlurEmailInput } className='form-input' />
            { !isEmailinputValid && <div className="invalid-message">You must enter your email.</div> }
            <input type="password" placeholder="Password" onBlur={ onBlurPasswordInput } className='form-input'/>
            { !isPasswordInputValid && <div className="invalid-message">You must enter your password.</div> }
            <div className="login-form__nav">
            <button type="submit"  disabled={ isFormInavlid() } className='form-button'>Submit</button>
        </div>
         
        </form>
      </div>
    );
}
export default AdminLogin;