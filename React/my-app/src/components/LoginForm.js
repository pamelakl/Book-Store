import React, { useContext } from 'react';
import {useState, useEffect} from 'react';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../actions/loginActions';
import { loginToSite, subscribeToSite } from '../server/auth';
import '../style/loginForm.css'
import '../style/all.css'

const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailinputValid, setIsEmailInputValid] = useState(true);
	const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
    const [action, setAction] = useState('LogIn')
    const {dispatchUserData} = useContext(LoginContext);
    const [errorMessage, setErrorMessage] = useState("");
  
    useEffect(() => {
		if (props.errorMessage !== "") {
			setErrorMessage(props.errorMessage);
		}
	}, [props.errorMessage]);

    const navigate = useNavigate();

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
        try {
            let userData;
            if (action === 'LogIn') {
                userData = await loginToSite(email, password);
                
            } else {
                userData = await subscribeToSite(email, password);
            }
            dispatchUserData(loginAction(userData));
            navigate("/");
        } catch (err) {
            setErrorMessage(err.message);
        }
    };
    

    return (
      <div className="login-form-container">
        {action === 'SignUp' ? <h2>הרשמה</h2> : <h2>התחברות</h2>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={onSubmitform} className='login-form'>
             <input placeholder="Email" onBlur={ onBlurEmailInput } className='form-input' />
		    { !isEmailinputValid && <div className="invalid-message">You must enter your email.</div> }
		    <input type="password" placeholder="Password" onBlur={ onBlurPasswordInput } className='form-input'/>
		    { !isPasswordInputValid && <div className="invalid-message">You must enter your password.</div> }
            <div className="login-form__nav">
			<button type="submit"  disabled={ isFormInavlid() } className='submit-form-button'>שליחה</button>
		</div>
         
        </form>
        <div>
            <button onClick={()=>setAction('LogIn')} className='form-button'>כניסה</button>
            <button onClick={()=>setAction('SignUp')} className='form-button'>הרשמה</button>
        </div>
      </div>
    );
}
export default LoginForm;